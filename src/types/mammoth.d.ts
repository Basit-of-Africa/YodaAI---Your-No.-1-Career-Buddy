declare module 'mammoth' {
  interface ExtractResult {
    value: string;
    messages: Array<{ type: string; message: string }>;
  }
  interface Options {
    buffer?: Buffer;
    arrayBuffer?: ArrayBuffer;
    path?: string;
  }
  export function extractRawText(options: { buffer: Buffer } | { arrayBuffer: ArrayBuffer } | { path: string }): Promise<ExtractResult>;
  export function convertToHtml(options: { buffer: Buffer } | { arrayBuffer: ArrayBuffer } | { path: string }): Promise<ExtractResult>;
}
