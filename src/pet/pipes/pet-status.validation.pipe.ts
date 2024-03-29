import {
    ArgumentMetadata,
    BadRequestException,
    PipeTransform,
} from '@nestjs/common';
import { PetStatus } from '../pet-status.enum';

export class PetStatusValidationPipe implements PipeTransform {
    readonly allowedPetStatuses = [PetStatus.FOUND, PetStatus.LOST];

    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(
                `Value ${value} is not a valid status`,
            );
        }
        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.allowedPetStatuses.indexOf(status);
        return idx !== -1;
    }
}
