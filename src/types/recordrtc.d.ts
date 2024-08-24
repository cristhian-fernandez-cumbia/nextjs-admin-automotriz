declare module 'recordrtc' {
  export default RecordRTC;
  export class RecordRTCPromisesHandler {
    constructor(mediaStream: MediaStream, options?: any);
    startRecording(): Promise<void>;
    stopRecording(): Promise<void>;
    getBlob(): Promise<Blob>;
    reset(): void;
  }
}