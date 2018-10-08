import { ConfigureModel, Model } from "app/crs-model/shared/configure-model";


export const selectedDataSet = (configureModel: ConfigureModel) => {
    return configureModel.dataSets.filter(x => x.isSelected)[0];
}

export const selectModel = (configureModel: ConfigureModel, modelIndex: number = 0) => {
    if (modelIndex === 0 && configureModel.models.length === 1) {
        return configureModel.models[configureModel.models.length - 1];
    } else if (modelIndex !== 0 && configureModel.models.length >= modelIndex) {
        return configureModel.models[modelIndex];
    } else {
        const model = new Model();
        configureModel.models.push(model);
        return model;
    }
}
