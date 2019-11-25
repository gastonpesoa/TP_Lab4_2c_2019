import { Injectable } from '@angular/core';
import { BrowserQRCodeReader } from '@zxing/library';


@Injectable({
  providedIn: 'root'
})
export class BarcodeService {

  videoInputDevices;
  firstDeviceId;

  constructor(public codeReader: BrowserQRCodeReader) { 
    this.initializeQrReader();
  }

  initializeQrReader() {
    this.codeReader
      .listVideoInputDevices()
      .then(videoInputDevices => {
        this.videoInputDevices = videoInputDevices;
        this.videoInputDevices.forEach(device =>
          console.log(`${device.label}, ${device.deviceId}`)
        );
        this.firstDeviceId = videoInputDevices[0].deviceId;
      })
      .catch(err => console.error(err));
  }

  scan() {
    this.codeReader
      .decodeFromInputVideoDevice(this.firstDeviceId, 'video')
      .then(result => console.log(result.getText()))
      .catch(err => console.error(err));
  }

}
