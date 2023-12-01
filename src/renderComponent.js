import React, { useState } from 'react';
import '@wokwi/elements';

const renderComponent = (type) => {
    switch (type) {
      case 'arduino-mega':
        return <wokwi-arduino-mega />;
      case 'arduino-nano':
        return <wokwi-arduino-nano />;
      case 'arduino-uno':
        return <wokwi-arduino-uno />;
      case 'dht22':
        return <wokwi-dht22 />;
      case 'neopixel':
        return <wokwi-neopixel r="1" g="0" b="0" />;
      case 'resistor':
        return <wokwi-resistor value="1" />;
      case 'servo':
        return <wokwi-servo angle="160" />;
      case 'gas-sensor':
        return <wokwi-gas-sensor />;
      case 'neopixel8':
        return <wokwi-neopixel-matrix rows="8" cols="8"></wokwi-neopixel-matrix>;
      case 'neopixel16':
        return  <wokwi-neopixel-matrix rows="16" cols="16"></wokwi-neopixel-matrix>;
      case 'servoDouble':
        return <wokwi-servo horn="double" angle="45"></wokwi-servo>
      case 'servoCross':
        return <wokwi-servo horn="cross" angle="45"></wokwi-servo>
      case 'ssd1306':
        return <wokwi-ssd1306></wokwi-ssd1306>;
      case 'joystick':
        return <wokwi-analog-joystick></wokwi-analog-joystick>;
      case 'sound-sensor':
        return <wokwi-big-sound-sensor></wokwi-big-sound-sensor>;
      case 'dip':
        return <wokwi-dip-switch-8></wokwi-dip-switch-8>;
      case 'DS1307':
        return <wokwi-ds1307></wokwi-ds1307>;
      case 'ESP32':
        return <wokwi-esp32-devkit-v1></wokwi-esp32-devkit-v1>;
      case 'flame sensor':
        return <wokwi-flame-sensor></wokwi-flame-sensor>;
      case 'franz':
        return <wokwi-franzininho>  </wokwi-franzininho>;
      case 'HCSR':
        return <wokwi-hc-sr04></wokwi-hc-sr04>;
      case 'heartbeat':
        return <wokwi-heart-beat-sensor></wokwi-heart-beat-sensor>;
      case 'HX':
        return <wokwi-hx711></wokwi-hx711>;
      case 'ILI':
        return <wokwi-ili9341></wokwi-ili9341>;
      case 'IRR':
        return <wokwi-ir-remote></wokwi-ir-remote>;
      case 'KS2':
        return <wokwi-ks2e-m-dc5></wokwi-ks2e-m-dc5>;
      case 'KY0':
        return <wokwi-ky-040></wokwi-ky-040>;
      case 'LEDBR':
        return <wokwi-led-bar-graph values="[1, 0, 1, 0, 1, 0, 1, 0, 1, 0]" color="red"></wokwi-led-bar-graph>;
      case 'LEDBG':
        return <wokwi-led-bar-graph values="[1, 0, 1, 0, 1, 0, 1, 0, 1, 0]" color="lime"></wokwi-led-bar-graph>;
      case 'LEDBO':
        return <wokwi-led-bar-graph values="[]" color="lime"></wokwi-led-bar-graph>;
      case 'LEDR':
        return <wokwi-led color="red" label="" lightcolor=""></wokwi-led>;
      case 'LEDY':
        return <wokwi-led color="yellow" label="" lightcolor=""></wokwi-led>;
      case 'LEDG':
        return <wokwi-led color="green" label="" lightcolor=""></wokwi-led>;
      case 'LEDO':
        return <wokwi-led color="white" label="100%"></wokwi-led>;
      case 'msd':
        return <wokwi-microsd-card></wokwi-microsd-card>;
      case 'MPU':
        return <wokwi-mpu6050></wokwi-mpu6050>;
      case 'nanorp':
        return <wokwi-nano-rp2040-connect></wokwi-nano-rp2040-connect>;
      case 'NTCtemp':
        return <wokwi-ntc-temperature-sensor></wokwi-ntc-temperature-sensor>;
      case 'photoRS':
        return <wokwi-photoresistor-sensor>
        </wokwi-photoresistor-sensor>;
      case 'PIR':
        return <wokwi-pir-motion-sensor></wokwi-pir-motion-sensor>;
      case 'potentiometer':
        return <span style="transform: ; display: inline-block;"> <wokwi-potentiometer>
      </wokwi-potentiometer></span>;
      case 'pushbutton':
        return <wokwi-pushbutton color="red" label="Push me."></wokwi-pushbutton>
      case 'whyamihere':
        return <wokwi-rotary-dialer></wokwi-rotary-dialer>;
      case 'slide switch':
        return <wokwi-slide-switch></wokwi-slide-switch>;
      case 'small sound sensor':
        return <wokwi-small-sound-sensor></wokwi-small-sound-sensor>;
      case 'steppermotor':
        return <wokwi-stepper-motor></wokwi-stepper-motor>;
      case 'nema17':
        return <wokwi-stepper-motor></wokwi-stepper-motor>;
      case 'tiltswitch':
        return <wokwi-tilt-switch></wokwi-tilt-switch>;
      default:
        return null;
    }
  };

export default renderComponent
