import { deserializeFile, deserializeUint8Array, serializeFile, serializeUint8Array } from './workers';

describe('serializeFile', () => {
    it('Should return a transferable object with the correct name, type and buffer', async () => {
        const file = new File(['Hello'], 'test.txt', { type: 'text/plain' });
        const result = await serializeFile(file);
        const fileBuffer = await file.arrayBuffer();
        expect(result.name).toEqual(file.name);
        expect(result.type).toEqual(file.type);
        expect(result.buffer).toEqual(fileBuffer);
    });
});

describe('deserializeFile', () => {
    it('Should return a File object with the correct name, type and buffer', async () => {
        const file = new File(['Hello'], 'test.txt', { type: 'text/plain' });
        const fileBuffer = await file.arrayBuffer();
        const transferableFile = await serializeFile(file);
        const result = deserializeFile(transferableFile);
        const resultBuffer = await result.arrayBuffer();
        expect(result.name).toEqual(file.name);
        expect(result.type).toEqual(file.type);
        expect(resultBuffer).toEqual(fileBuffer);
    });
});

describe('serializeUint8Array', () => {
    it('Should return a transferable object with the correct buffer, byteOffset and byteLength', () => {
        const arr = new Uint8Array([72, 101, 108, 108, 111, 44]);
        const result = serializeUint8Array(arr);
        expect(result.buffer).toEqual(arr.buffer);
        expect(result.byteOffset).toEqual(arr.byteOffset);
        expect(result.byteLength).toEqual(arr.byteLength);
    });
});

describe('deserializeUint8Array', () => {
    it('Should return a Uint8Array object with the correct buffer, byteOffset and byteLength', () => {
        const arr = new Uint8Array([72, 101, 108, 108, 111, 44]);
        const transferableUint8Array = serializeUint8Array(arr);
        const result = deserializeUint8Array(transferableUint8Array);
        expect(result.buffer).toEqual(arr.buffer);
        expect(result.byteOffset).toEqual(arr.byteOffset);
        expect(result.byteLength).toEqual(arr.byteLength);
    });
});