import React, { useState, useRef } from "react";
import "./App.css";
import "@wokwi/elements";
import Draggable from "react-draggable";
import renderComponent from "./renderComponent";
import openTrash from "./trash_opened.png";
import closeTrash from "./trash_closed.png";
import casmmLogo from "./casmm_logo.png";
import html2canvas from "html2canvas";

export default function App() {
  const [components, setComponents] = useState([]);

  const addComponent = (type) => {
    const id = Math.random().toString(36).substring(2, 9); // Unique ID for key
    setComponents([...components, { type, id }]);
  };

  const deleteComponent = (id) => {
    setComponents(components.filter((component) => component.id !== id));
  };

  const [allComponents, setAllComponents] = useState([
    { label: "Arduino Mega", value: "arduino-mega" },
    { label: "Arduino Nano", value: "arduino-nano" },
    { label: "Arduino Uno", value: "arduino-uno" },
    { label: "DHT22", value: "dht22" },
    { label: "Neopixel", value: "neopixel" },
    { label: "Neopixel Matrix (8)", value: "neopixel8" },
    { label: "Neopixel Matrix (16)", value: "neopixel16" },
    { label: "Resistor", value: "resistor" },
    { label: "Servo (Single)", value: "servo" },
    { label: "Servo (Double)", value: "servoDouble" },
    { label: "Servo (Cross)", value: "servoCross" },
    { label: "SSD1306", value: "ssd1306" },
    { label: "Joystick", value: "joystick" },
    { label: "Gas Sensor", value: "gas-sensor", className: "sensor" },
    { label: "Sound Sensor", value: "sound-sensor", className: "sensor" },
    { label: "DIP Switch 8", value: "dip"},
    { label: "DS1307", value: "DS1307"},
    { label: "ESP32 Devkit V1", value: "ESP32"},
    { label: "Flame Sensor", value: "flame sensor"},
    { label: "Franzininho", value: "franz"},
    { label: "HC-SR04", value: "HCSR"},
    { label: "Heart Beat Sensor", value: "heartbeat"},
    { label: "HX711 (50kg)", value: "HX"},
    { label: "ILI9341", value: "ILI"},
    { label: "IR Reciever", value: "IRR"},
    { label: "KS2E-M-DC5", value: "KS2"},
    { label: "KY040", value: "KY0"},
    { label: "LED Bar Graph (Red)", value: "LEDBR"},
    { label: "LED Bar Graph (Green)", value: "LEDBG"},
    { label: "LED Bar Graph (Off)", value: "LEDBO"},
    { label: "LED (Red)", value: "LEDR"},
    { label: "LED (Yellow)", value: "LEDY"},
    { label: "LED (Green)", value: "LEDG"},
    { label: "LED (On)", value: "LEDO"},
    { label: "MicroSD Card", value: "msd"},
    { label: "MPU6050", value: "MPU"},
    { label: "Nano RP2040 Connect", value: "nanorp"},
    { label: "NTC Temp. Sensor", value: "NTCtemp"},
    { label: "Photoresistor Sensor", value: "photoRS"},
    { label: "PIR Mortion Sensor", value: "PIR"},
    { label: "Potentiometer", value: "potentiometer"},
    { label: "PushButton", value: "pushbutton"},
    { label: "Rotary Dialer", value: "whyamihere"},
    { label: "Slide Switch", value: "slide switch"},
    { label: "Rotary Dialer", value: "whyamihere"},
    { label: "Small Sound Sensor", value: "small sound sensor"},
    { label: "Stepper Motor", value: "steppermotor"},
    { label: "Stepper Motor (Nema 17)", value: "nema17"},
    { label: "Tilt Switch", value: "tiltswitch"}
  ]);

  const [searchInput, setSearchInput] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(allComponents);

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleFocus = () => {
    setIsSearchFocused(true);
  };

  const handleBlur = () => {
    // Use a timeout to allow click event to process before hiding the dropdown
    setTimeout(() => setIsSearchFocused(false), 200);
  };

  //React State for Button
  const [isPressed, setIsPressed] = useState(false);

  const garbageRef = useRef(null);

  const [isTrashOpen, setIsTrashOpen] = useState(false);

  const onDragOverTrash = (e, data) => {
    // Logic to determine if over trash
    // Set isTrashOpen to true if over trash
    const draggableRect = e.target.getBoundingClientRect();
    const garbageRect = garbageRef.current.getBoundingClientRect();

    const isOverTrash =
      draggableRect.right > garbageRect.left &&
      draggableRect.left < garbageRect.right &&
      draggableRect.bottom > garbageRect.top &&
      draggableRect.top < garbageRect.bottom;

    setIsTrashOpen(isOverTrash);
  };

  const onDragStop = (id, e, data) => {
    //If dragabble object is in range of trash, delete it
    const draggableRect = e.target.getBoundingClientRect();
    const garbageRect = garbageRef.current.getBoundingClientRect();

    const isDroppedOnTrash =
      draggableRect.right > garbageRect.left &&
      draggableRect.left < garbageRect.right &&
      draggableRect.bottom > garbageRect.top &&
      draggableRect.top < garbageRect.bottom;

    if (isDroppedOnTrash) {
      deleteComponent(id);
    }

    setIsTrashOpen(false); // Reset the trash icon state
  };

  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchInput(searchText);
    const filtered = allComponents.filter((comp) =>
      comp.label.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const takeScreenshot = () => {
    // Targeting the 'draggable-container' div
    const screenshotTarget = document.querySelector(".draggable-container");

    if (screenshotTarget) {
      html2canvas(screenshotTarget, {
        useCORS: true,
        scrollY: -window.scrollY,
        scrollX: -window.scrollX,
        windowHeight: screenshotTarget.scrollHeight,
        windowWidth: screenshotTarget.scrollWidth,
      }).then((canvas) => {
        canvas.toBlob(function (blob) {
          let link = document.createElement("a");
          link.download = "casmm_diagram.png";
          link.href = URL.createObjectURL(blob);
          link.click();
        });
      });
    }
  };

  return (
    <div className="App">
      <header className="header_bar">
        <a className="logo" href="https://www.casmm.org/">
          <img src={casmmLogo} alt="Company Logo" />
        </a>
        <div className="header_title">{"Arduino Circuitry"}</div>
        <aa className="header_credits">{"powered by WOKWI"}</aa>
      </header>

      <div className="side-bar">
        <div className="search-box">
          <h3>Component Search</h3> {/* Title */}
          <input
            type="text"
            placeholder="Search components..."
            onChange={handleSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {filteredOptions.length > 0 && isSearchFocused && (
            <ul>
              {filteredOptions.map(({ label, value }) => (
                <li key={value} onClick={() => addComponent(value)}>
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="screenshot-section">
          <h3>Screenshot</h3>
          <button
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            className={`screenshot-button ${isPressed ? "pressed" : ""}`}
            onClick={takeScreenshot}
          ></button>
        </div>
        <div className="note">
          {"* Note: Screenshot will be saved to your CASMM Diagram Image *"}
        </div>
      </div>

      {/* Container for Draggable Elements */}
      <div className="draggable-container">
        {components.map(({ type, id }) => (
          <Draggable
            key={id}
            onDrag={(e, data) => onDragOverTrash(e, data)}
            onStop={(e, data) => onDragStop(id, e, data)}
            defaultPosition={{x:200, y:400}}
            bounds={{top:0, left:-325}}
          >
            <div>{renderComponent(type, id)}</div>
          </Draggable>
        ))}
      </div>

      {/* Trash Icon */}
      <div
        className="trash-image"
        ref={garbageRef}
        style={{ position: "fixed", right: "20px", bottom: "20px" }}
      >
        <img
          src={isTrashOpen ? openTrash : closeTrash}
          alt={isTrashOpen ? "Open Trash" : "Closed Trash"}
          style={{ width: "70px", height: "70px" }} // Adjust the size as needed
        />
      </div>
    </div>
  );
}
