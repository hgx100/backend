import { Query } from '@nestjs/cqrs';

import { TResult } from '@common/types';

export class GetUserIdsByUuidsOrVlessUuidsQuery extends Query<
    TResult<
        {
            tId: bigint;
            uuid: string;
            vlessUuid: string;
        }[]
    >
> {
    constructor(public readonly uuids: string[]) {
        super();
    }
}
