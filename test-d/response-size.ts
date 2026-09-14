import {expectTypeOf} from 'expect-type';
import ky, {
	type Options, type KyRequest, type KyError, ResponseSizeError, isResponseSizeError,
} from 'ky';

const options: Options = {maxResponseSize: 1024};
expectTypeOf(options.maxResponseSize).toEqualTypeOf<number | undefined>();

const error = new ResponseSizeError(new Request('https://example.com'), 1024);
expectTypeOf(error).toExtend<KyError>();
expectTypeOf(error.request).toEqualTypeOf<KyRequest>();
expectTypeOf(error.maxResponseSize).toEqualTypeOf<number>();

const unknownError: unknown = error;
if (isResponseSizeError(unknownError)) {
	expectTypeOf(unknownError).toEqualTypeOf<ResponseSizeError>();
}

void ky('https://example.com', {maxResponseSize: Number.POSITIVE_INFINITY});

// @ts-expect-error - The size limit must be a number.
void ky('https://example.com', {maxResponseSize: '1024'});
