import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'baFirstCharToUpperCase' })
export class BaFirstCharToUpperCase implements PipeTransform {

    transform(input: string): string {
        if (!input || input.length < 1) {
            return '';
        }
        return input.charAt(0).toUpperCase() + input.slice(1);
    }
}
