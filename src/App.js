import React, { useState, useRef } from 'react';
import './App.css';
import '@wokwi/elements';
import Draggable from 'react-draggable';
import renderComponent from './renderComponent';
import openTrash from './trash_opened.png';
import closeTrash from './trash_closed.png';
import casmmLogo from './casmm_logo.png'
import html2canvas from 'html2canvas';


export default function App() {
  const [components, setComponents] = useState([]);

  const addComponent = (type) => {
    const id = Math.random().toString(36).substring(2, 9); // Unique ID for key
    setComponents([...components, { type, id }]);
  };

  const deleteComponent = (id) => {
    setComponents(components.filter(component => component.id !== id));
  };

  const [allComponents, setAllComponents] = useState([
    { label: "Arduino Mega", value: "arduino-mega" },
    { label: "Arduino Nano", value: "arduino-nano" },
    { label: "Arduino Uno", value: "arduino-uno" },
    { label: "DHT22", value: "dht22" },
    { label: "Neopixel", value: "neopixel" },
    { label: "Resistor", value: "resistor" },
    { label: "Servo", value: "servo" },
    { label: "Gas Sensor", value: "gas-sensor" }
  ]);
  
  const [searchInput, setSearchInput] = useState('');
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
  
    const isOverTrash = (
      draggableRect.right > garbageRect.left &&
      draggableRect.left < garbageRect.right &&
      draggableRect.bottom > garbageRect.top &&
      draggableRect.top < garbageRect.bottom
    );
  
    setIsTrashOpen(isOverTrash);
  };

  const onDragStop = (id, e, data) => {
    //If dragabble object is in range of trash, delete it
    const draggableRect = e.target.getBoundingClientRect();
    const garbageRect = garbageRef.current.getBoundingClientRect();

    const isDroppedOnTrash = (
      draggableRect.right > garbageRect.left &&
      draggableRect.left < garbageRect.right &&
      draggableRect.bottom > garbageRect.top &&
      draggableRect.top < garbageRect.bottom
    );

    if (isDroppedOnTrash) {
      deleteComponent(id);
    }

    setIsTrashOpen(false); // Reset the trash icon state
  };

  const handleSearch = (event) => {

    const searchText = event.target.value;
    setSearchInput(searchText);
    const filtered = allComponents.filter(comp =>
      comp.label.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredOptions(filtered);
  };
  
  const takeScreenshot = () => {
    // const screenshotTarget = document.getElementsByClassName('screenshot_area');
    // html2canvas(screenshotTarget).then(canvas => {
    //   // You can then download the image, or append it to the document
    //   const image = canvas.toDataURL('image/png');
    //   const link = document.createElement('a');
    //   link.href = image;
    //   link.download = 'testingscreen.png';
    //   link.click();
    // });
  };
  

  return (
    <div className="App">
      <header className="header_bar">
        <a className="logo" href="https://www.casmm.org/">
          <img 
            src={casmmLogo}
            alt="Company Logo" />
        </a>
        <div className="header_title">
          {"Arduino Circuitry"}
        </div>
        <aa className="header_credits">
          {"powered by WOKWI"}
        </aa>
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
                <li key={value} onClick={() => addComponent(value)}>{label}</li>
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
            className={`screenshot-button ${isPressed ? 'pressed' : ''}`}
            onClick={takeScreenshot}
          >
          </button>
        </div>
        <div className="note">
          {"* Note: Screenshot will be saved to your CASMM Diagram Image *"}
        </div>
      </div>

      <div className="screenshot_area"></div>

      {/* Draggable Components */}
      {components.map(({ type, id }) => (
          <Draggable 
            key={id}
            onDrag={(e, data) => onDragOverTrash(e, data)} 
            onStop={(e, data) => onDragStop(id, e, data)}>
            <div className="draggable-item">{renderComponent(type, id)}</div>
          </Draggable>
        ))}

      {/* Trash Icon */}
      <div className="trash-image" 
           ref={garbageRef}
           style={{ position: 'fixed', right: '20px', bottom: '20px' }}>
        <img 
          src={isTrashOpen ? openTrash : closeTrash} 
          alt={isTrashOpen ? "Open Trash" : "Closed Trash"} 
          style={{ width: '70px', height: '70px' }} // Adjust the size as needed
        />
      </div>
    </div>
  );
}
