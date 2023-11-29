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
        return <wokwi-servo angle="45" />;
      case 'gas-sensor':
        return <wokwi-gas-sensor />;
      default:
        return null;
    }
  };

export default renderComponent