import * as Hapi from "hapi";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../configurations";
import * as Nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import * as fs from "fs";

import {
  IAgIntel,
  IBranchData,
  IFarmer,
  ICustomerPreferences,
  ILoanOfficer,
  IMobColConfig,
  ICustomerDataMapping,
  colData,
  farmerMappingModel,
  dynamicFarmerData,
  IFarmerPL,
  MobileColumnData,
  IProcessPreferences,
  emailPreferences,
  IBranch
} from "./flm-model";
import { IMlModel } from "../mltask/mltask-model";
import * as Mongoose from "mongoose";
import { farmerScore } from "./score-helper";

export default class flmController {
  private database: IDatabase;
  private configs: IServerConfigurations;
  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.configs = configs;
    this.database = database;
  }

  public async getScoresForFarmers(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      await this.database.mlModel
        .find({ projectName: "sdlkjl" })
        .findOne((err, res: IMlModel) => {
          reply(res.models[0]).code(200);
        });
    } catch (ex) {}
  }

  public async getAgIntelData(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      await this.database.agIntelModel.find((err, res: IAgIntel[]) => {
        if (err) {
          throw err;
        } else {
          reply(res).code(200);
        }
      });
    } catch (ex) {
      reply({ success: false }).code(500);
    }
  }

  public async getBranchLocations(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      await this.database.branchModel.find((err, res: IBranchData[]) => {
        if (err) {
          throw err;
        } else {
          reply(res).code(200);
        }
      });
    } catch (ex) {
      reply({ success: false }).code(500);
    }
  }

  public async getFarmerData(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      let fm = new farmerScore();
      await this.database.farmerDataModel
        .find({
          customerName: request.query["customerName"],
          branchId: request.query["branchId"]
        })
        .find((err, res: IFarmer[]) => {
          res.forEach(farmer => {
            if (farmer.score) {
              farmer.score = farmer.HScore.toString();
            }
          });
          // res.forEach((farmer)=>{
          //     fm.getFarmerScore(farmer);
          // });
          if (err) {
            throw err;
          } else {
            reply(res).code(200);
          }
        });
    } catch (ex) {
      reply({ success: false }).code(500);
    }
  }

  public async insertFarmerDataBulk(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      let payload = <IFarmer[]>request.payload;
      payload.forEach(farmer => {
        farmer.HScore = 0;
        farmer.createdDate = new Date();
        farmer.modifiedDate = null;
      });
      let config = this.database.farmerDataModel.insertMany(payload);
      if (config) {
        return reply(config).code(200);
      } else {
        throw "error";
      }
    } catch (ex) {
      reply({ success: false }).code(500);
    }
  }

  public async insertCustomerPreferences(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      let payload = <ICustomerPreferences[]>(
        request.payload.params.updates[2].value
      );
      payload.forEach(element => {
        element.customerName = request.payload.params.updates[0].value;
        element.branchId = request.payload.params.updates[1].value;
      });
      let config = this.database.customerPreferencesModel.insertMany(payload);
      if (config) {
        return reply(config).code(200);
      } else {
        throw "error";
      }
    } catch (ex) {
      reply({ success: false }).code(500);
    }
  }

  public async getCustomerPreferences(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      await this.database.customerPreferencesModel
        .find({ customerName: request.query["customerName"] , branchId: request.query['branchId']})
        .find((err, res: IFarmer[]) => {
          if (err) {
            throw err;
          } else {
            reply(res).code(200);
          }
        });
    } catch (ex) {
      reply({ success: false }).code(500);
    }
  }

  public async iSNewCustomer(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      await this.database.farmerDataModel.count(
        { customerName: request.query["customerName"] },
        function(err, res: number) {
          if (err) {
            throw err;
          } else {
            reply(res).code(200);
          }
        }
      );
    } catch (ex) {
      reply(ex).code(500);
    }
  }

  public async insertFarmerData(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      let payload = <dynamicFarmerData>request.payload;
      let requestData = payload.farmerData;
      let data = {};
      this.database.customerDataMappingModel
        .find({ customerName: payload.customerName , branchId: payload.branchId})
        .findOne((err, columns: ICustomerDataMapping) => {
          let cols = columns.mappingModel;
          requestData.forEach(prop => {
            data[prop.sheetCol] = prop.value;
          });
          let farmer: IFarmerPL = {
            age:
              requestData.filter(
                col =>
                  col.sheetCol ==
                  cols.filter(x => x.defaultCol == "age")[0].sheetCol
              ).length > 0
                ? requestData.filter(
                    col =>
                      col.sheetCol ==
                      cols.filter(x => x.defaultCol == "age")[0].sheetCol
                  )[0].value
                : "",
            HScore: 0,
            amountRequested:
              requestData.filter(
                col =>
                  col.sheetCol ==
                  cols.filter(x => x.defaultCol == "amountRequested")[0]
                    .sheetCol
              ).length > 0
                ? requestData.filter(
                    col =>
                      col.sheetCol ==
                      cols.filter(x => x.defaultCol == "amountRequested")[0]
                        .sheetCol
                  )[0].value
                : "",
            agent:
              requestData.filter(
                col =>
                  col.sheetCol ==
                  cols.filter(x => x.defaultCol == "agent")[0].sheetCol
              ).length > 0
                ? requestData.filter(
                    col =>
                      col.sheetCol ==
                      cols.filter(x => x.defaultCol == "agent")[0].sheetCol
                  )[0].value
                : "",
            cropType:
              requestData.filter(
                col =>
                  col.sheetCol ==
                  cols.filter(x => x.defaultCol == "cropType")[0].sheetCol
              ).length > 0
                ? requestData.filter(
                    col =>
                      col.sheetCol ==
                      cols.filter(x => x.defaultCol == "cropType")[0].sheetCol
                  )[0].value
                : "",
            customerName: payload.customerName,
            eligibilityStatus: "Pending",
            farmArea:
              requestData.filter(
                col =>
                  col.sheetCol ==
                  cols.filter(x => x.defaultCol == "farmArea")[0].sheetCol
              ).length > 0
                ? requestData.filter(
                    col =>
                      col.sheetCol ==
                      cols.filter(x => x.defaultCol == "farmArea")[0].sheetCol
                  )[0].value
                : "",
            latitude:
              requestData.filter(
                col =>
                  col.sheetCol ==
                  cols.filter(x => x.defaultCol == "latitude")[0].sheetCol
              ).length > 0
                ? requestData.filter(
                    col =>
                      col.sheetCol ==
                      cols.filter(x => x.defaultCol == "latitude")[0].sheetCol
                  )[0].value
                : "",
            longitude:
              requestData.filter(
                col =>
                  col.sheetCol ==
                  cols.filter(x => x.defaultCol == "longitude")[0].sheetCol
              ).length > 0
                ? requestData.filter(
                    col =>
                      col.sheetCol ==
                      cols.filter(x => x.defaultCol == "longitude")[0].sheetCol
                  )[0].value
                : "",
            loanType:
              requestData.filter(
                col =>
                  col.sheetCol ==
                  cols.filter(x => x.defaultCol == "loanType")[0].sheetCol
              ).length > 0
                ? requestData.filter(
                    col =>
                      col.sheetCol ==
                      cols.filter(x => x.defaultCol == "loanType")[0].sheetCol
                  )[0].value
                : "",
            location: "",
            name:
              requestData.filter(
                col =>
                  col.sheetCol ==
                  cols.filter(x => x.defaultCol == "name")[0].sheetCol
              ).length > 0
                ? requestData.filter(
                    col =>
                      col.sheetCol ==
                      cols.filter(x => x.defaultCol == "name")[0].sheetCol
                  )[0].value
                : "",
            nationalId:
              requestData.filter(
                col =>
                  col.sheetCol ==
                  cols.filter(x => x.defaultCol == "nationalId")[0].sheetCol
              ).length > 0
                ? requestData.filter(
                    col =>
                      col.sheetCol ==
                      cols.filter(x => x.defaultCol == "nationalId")[0].sheetCol
                  )[0].value
                : "",
            notes: "",
            pastHistory:
              requestData.filter(
                col =>
                  col.sheetCol ==
                  cols.filter(x => x.defaultCol == "pastHistory")[0].sheetCol
              ).length > 0
                ? requestData.filter(
                    col =>
                      col.sheetCol ==
                      cols.filter(x => x.defaultCol == "pastHistory")[0]
                        .sheetCol
                  )[0].value
                : "",
            score:
              requestData.filter(
                col =>
                  col.sheetCol ==
                  cols.filter(x => x.defaultCol == "score")[0].sheetCol
              ).length > 0
                ? requestData.filter(
                    col =>
                      col.sheetCol ==
                      cols.filter(x => x.defaultCol == "score")[0].sheetCol
                  )[0].value
                : "",
            sex:
              requestData.filter(
                col =>
                  col.sheetCol ==
                  cols.filter(x => x.defaultCol == "sex")[0].sheetCol
              ).length > 0
                ? requestData.filter(
                    col =>
                      col.sheetCol ==
                      cols.filter(x => x.defaultCol == "sex")[0].sheetCol
                  )[0].value
                : "",
            data: JSON.stringify(data),
            branchId: payload.branchId,
            createdDate : new Date(),
            modifiedDate : null
          };
          let config = this.database.farmerDataModel.create(farmer);
          config.then(value => {
            if (config) {
              return reply(config).code(200);
            } else {
              throw "error";
            }
          });
        });
    } catch (ex) {
      reply({ success: false }).code(500);
    }
  }

  public async getLoanOfficers(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      await this.database.loanOfficersModel
        .find({
          customerName: request.query["customerName"],
          branchId: request.query["branchId"]
        })
        .find((err, res: ILoanOfficer[]) => {
          if (err) {
            throw err;
          } else {
            reply(res).code(200);
          }
        });
    } catch (ex) {
      reply({ success: false }).code(500);
    }
  }

  public async updateLoanOfficer(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      let postData = <ILoanOfficer>request.payload;
      await this.database.loanOfficersModel.findOne(
        { _id: Mongoose.Types.ObjectId(postData.id.toString()) },
        function(err, doc) {
          doc.isActive = postData.isActive;
          doc.save();
          if (err) {
            throw err;
          } else {
            reply(doc).code(200);
          }
        }
      );
    } catch (ex) {
      reply({ success: false }).code(500);
    }
  }

  public async InsertLoanOfficer(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      let postData = <ILoanOfficer>request.payload;
      let insertedData = await this.database.loanOfficersModel.create(postData);
      if (insertedData) {
        return reply(insertedData).code(200);
      } else {
        throw "error";
      }
    } catch (ex) {
      reply({ success: false }).code(500);
    }
  }

  public async GetCustomerColumnData(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      await this.database.farmerDataModel
        .find({ customerName: request.query["customerName"] })
        .findOne((err, res: IFarmer) => {
          if (err) {
            throw err;
          } else {
            reply(Object.keys(JSON.parse(res.data))).code(200);
          }
        });
    } catch (ex) {
      reply({ success: false }).code(500);
    }
  }

  public async ConfigureMobileColumnSettings(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      let postData = <IMobColConfig>request.payload;
      let insertedData = await this.database.mobColConfigModel.create(postData);
      if (insertedData) {
        return reply(insertedData).code(200);
      } else {
        throw "error";
      }
    } catch (ex) {}
  }

  public async InsertCustomerMappingModel(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      let postData = <ICustomerDataMapping>request.payload;
      let insertedData = await this.database.customerDataMappingModel.create(
        postData
      );
      if (insertedData) {
        return reply(insertedData).code(200);
      } else {
        throw "error";
      }
    } catch (ex) {}
  }

  public async updateEligibilityStatus(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      let incoming = <IFarmer>request.payload;
      let existingNotes = "";
      await this.database.farmerDataModel
        .findOne({ _id: Mongoose.Types.ObjectId(incoming._id) })
        .select("notes")
        .find((err, response) => {
          if (err) {
            throw err;
          } else {
            existingNotes = response.toString();
          }
        });
      let updated = this.database.farmerDataModel.update(
        { _id: Mongoose.Types.ObjectId(incoming._id) },
        {
          createdDate : incoming.createdDate == null ? new Date() : incoming.createdDate,
          eligibilityStatus: incoming.eligibilityStatus,
          notes: existingNotes + "\n" + incoming.notes,
           modifiedDate : new Date()
        }
      );

      await this.database.customerProcessPreferencesModel.findOne(
        { customerId: incoming.customerId , branchId: incoming.branchId},
        (error, doc) => {
          let currentPreferences;
          let currentStatus;
          let currentMail;

          currentPreferences = doc.emailPreferences;
          currentPreferences.forEach(item => {
            if (
              item.action.toLowerCase() ===
              incoming.eligibilityStatus.toLowerCase()
            ) {
              currentStatus = item.action;
              currentMail = item.emailId;
            }
          });

          if (currentMail) {
            let toMail = currentMail;
            let fromMail = "no-reply@harvesting.co";
            var htmlToSend = `<div>
                Hi,<br/>
                <p><b>Updated Status</b>: ${currentStatus}</p>
              Thanks,
              <br/><span>Harvesting.</span>
                </div>`;
            let mailOptions = {
              from: "" + incoming.customerName + " <" + fromMail + ">",
              to: toMail,
              subject: "Status Updated from Customer - " + incoming.customerName,
              html: htmlToSend
            };
            return this.sendEmail(mailOptions);
          }
        }
      );

      reply(updated).code(200);
    } catch (ex) {
      reply(ex).code(200);
    }
  }

  public async AlignOrderValue(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {}

  public async GetMobileColumnConfiguration(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      await this.database.mobColConfigModel
        .find({
          customerName: request.query["customerName"],
          branchId: request.query["branchId"]
        })
        .findOne((error, config) => {
          if (error) {
            throw error;
          }
          if (config) return reply(config).code(200);
          else return reply(0).code(204);
        });
    } catch (ex) {
      return reply(ex).code(500);
    }
  }

  public async PushMobileColumnConfiguration(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    let incomingMobConfig = <IMobColConfig>request.payload;
    try {
      console.log(incomingMobConfig.mobileConfigData);
      await this.database.mobColConfigModel
        .find({
          customerName: incomingMobConfig.customerName,
          branchId: incomingMobConfig.branchId
        })
        .find((error, config) => {
          if (config.length > 0) {
            console.log("update..");
            let updated = this.database.mobColConfigModel.update(
              { customerName: incomingMobConfig.customerName , branchId: incomingMobConfig.branchId},
              {
                mobileConfigData: incomingMobConfig.mobileConfigData
              }
            );
            return reply(updated).code(200);
          } else {
            console.log("insert");

            this.database.mobColConfigModel
              .create(incomingMobConfig)
              .then(response => {
                return reply(response).code(200);
              });
          }
        });
    } catch (ex) {
      return reply(ex).code(500);
    }
  }

  public async GetCustomerMappingModel(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      let excludeColumns = [
        "display",
        "data",
        "eligibilitystatus",
        "notes",
        "customername"
      ];
      await this.database.customerDataMappingModel
        .find({
          customerName: request.query["customerName"],
          branchId: request.query["branchId"]
        })
        .findOne((err, mappingData: ICustomerDataMapping) => {
          if (mappingData != null) {
            this.database.farmerDataModel
              .find({
                customerName: request.query["customerName"],
                branchId: request.query["branchId"]
              })
              .findOne((err, farmerData: IFarmer) => {
                let mappingModel = [];
                let dataColumns = Object.keys(JSON.parse(farmerData.data));
                dataColumns.forEach(col => {
                  let sheetColMapping = mappingData.mappingModel.filter(
                    x => x.sheetCol == col
                  );
                  if (
                    sheetColMapping.length > 0 &&
                    sheetColMapping[0].sheetCol.trim().length > 0
                  ) {
                    mappingModel.push({
                      category: sheetColMapping[0].category,
                      defaultCol: sheetColMapping[0].defaultCol,
                      sheetCol: sheetColMapping[0].sheetCol
                    });
                  } else {
                    if (excludeColumns.indexOf(col.toLocaleLowerCase()) < 0) {
                      mappingModel.push({
                        category: "others",
                        defaultCol: "",
                        sheetCol: col
                      });
                    }
                  }
                });
                let responseMapping = {
                  customerName: mappingData.customerName,
                  mappingModel: mappingModel
                };
                return reply(responseMapping).code(200);
              });
          } else {
            return reply(mappingData).code(200);
          }
        });
    } catch (ex) {}
  }

  public async sendFeedbackEmail(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      let submittedData = request.payload;
      let toMail = "info@harvesting.co";
      let fromMail = "no-reply@harvesting.co";

      var htmlToSend = `<div>
          Hi,<br/>
          <p><b>Subject</b>: ${submittedData.subject}</p>
          <p><b>Message</b>: ${submittedData.message}</p> <br/>
        Thanks,
        <br/><span>Harvesting.</span>
          </div>`;
      let mailOptions = {
        from: "" + submittedData.currentUser + " <" + fromMail + ">",
        to: "pallavid@byteridge.com",
        subject:
          "Support Request from Customer - " + submittedData.customerName,
        html: htmlToSend
      };
      return this.sendEmail(mailOptions);
    } catch (ex) {
      return reply(ex).code(500);
    }
  }

  sendEmail(mailOptions) {
    let fromMail = "no-reply@harvesting.co";
    let transporter = Nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: fromMail,
        pass: "Harvest123"
      }
    });
    transporter.sendMail(mailOptions, function(error, response) {
      if (error) {
        return error;
      }
      console.log("mail sent");
      return response;
    });
  }

  public async getStatus(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    try {
      await this.database.customerProcessPreferencesModel
        .find({ customerId: request.query["customerId"] , branchId: request.query["branchId"]})
        .find((err, res: IProcessPreferences[]) => {
          if (err) {
            throw err;
          } else {
            reply(res).code(200);
          }
        });
    } catch (ex) {
      reply({ success: false }).code(500);
    }
  }

  public async updateStatus(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      let postData = <IProcessPreferences>request.payload;
      await this.database.customerProcessPreferencesModel.findOne(
        { customerId: postData.customerId , branchId: postData.branchId},
        async (err, doc) => {
          if (doc == null) {
            let postData = <IProcessPreferences>request.payload;
            await this.database.customerProcessPreferencesModel.create({
              customerId: postData.customerId,
              emailPreferences: postData.emailPreferences,
              branchId: postData.branchId
            });
          } else {
            doc.emailPreferences = postData.emailPreferences;
            doc.save();
          }
          if (err) {
            throw err;
          } else {
            reply(doc).code(200);
          }
        }
      );
    } catch (ex) {
      reply({ success: false }).code(500);
    }
  }

  public async addBranch(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    try {
      let postData = <IBranch>request.payload;
      let insertedData = await this.database.customerBranchModel.create({
        customerId: postData.customerId,
        branchName: postData.branchName
      });
      reply(insertedData).code(200);
      // await this.database.customerBranchModel.findOne(
      //   { customerId: postData.customerId},
      //   async (err, doc) => {
      //     if (doc == null) {
      //       let postData = <IBranch>request.payload;

      //     }

      //     if (err) {
      //       throw err;
      //     } else {
      //       reply(doc).code(200);
      //     }
      //   }

      //  );
    } catch (ex) {
      reply({ success: false }).code(500);
    }
  }
  public async getBranchByCustomer(
    request: Hapi.Request,
    reply: Hapi.ReplyNoContinue
  ) {
    try {
      let fm = new farmerScore();
      await this.database.customerBranchModel
        .find({ customerId: request.query["customerId"] })
        .find((err, res: IBranch[]) => {
          if (err) {
            throw err;
          } else {
            reply(res).code(200);
          }
        });
    } catch (ex) {
      reply({ success: false }).code(500);
    }
  }

}
