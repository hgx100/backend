import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { fail, ok, TResult } from '@common/types';
import { ERRORS } from '@libs/contracts/constants';

import { GetUserIdsByUuidsOrVlessUuidsQuery } from './get-user-ids-by-uuids-or-vless-uuids.query';
import { UsersRepository } from '../../repositories/users.repository';

@QueryHandler(GetUserIdsByUuidsOrVlessUuidsQuery)
export class GetUserIdsByUuidsOrVlessUuidsHandler implements IQueryHandler<
    GetUserIdsByUuidsOrVlessUuidsQuery,
    TResult<
        {
            tId: bigint;
            uuid: string;
            vlessUuid: string;
        }[]
    >
> {
    private readonly logger = new Logger(GetUserIdsByUuidsOrVlessUuidsHandler.name);
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(query: GetUserIdsByUuidsOrVlessUuidsQuery): Promise<
        TResult<
            {
                tId: bigint;
                uuid: string;
                vlessUuid: string;
            }[]
        >
    > {
        try {
            const users = await this.usersRepository.getUserIdsByUuidsOrVlessUuids(query.uuids);

            return ok(users);
        } catch (error) {
            this.logger.error(error);
            return fail(ERRORS.INTERNAL_SERVER_ERROR);
        }
    }
}
