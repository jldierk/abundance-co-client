import { useState, useEffect } from "react";
import DragIcon from "../assets/drag.svg"
import HideIcon from "../assets/hide.svg"


const DraggableTable = (props) => {
    var elements = props.elements;
    const [dragging, setDragging] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);
    const [mousePos, setMousePos] = useState({x:0, y:0});
    const [dropZone, setDropZone] = useState(0);

    function updateSelection(index) {
        setSelectedElement(index);
        props.updateSelectedCallback(elements[index]);                        
    }

    const mouseMoveHandler = (event) => {
    	setMousePos({
      		x:event.clientX,
      		y:event.clientY
    	});
  	}

    // get closest drop zone
    useEffect(() => {
        if (dragging !== null) {
            // get all drop-zones
            const elements = Array.from(document.getElementsByClassName("drop-zone"));
            // get all drop-zones' y-axis position
            // if we were using a horizontally-scrolling list, we would get the .left property
            const positions = elements.map((e) => e.getBoundingClientRect().top);
            // get the difference with the mouse's y position
            const absDifferences = positions.map((v) => Math.abs(v - mousePos.y));

            // get the item closest to the mouse
            let result = absDifferences.indexOf(Math.min(...absDifferences));

            // if the item is below the dragging item, add 1 to the index
            if (result > dragging) result += 1;

            setDropZone(result);
        }
    }, [dragging, mousePos]);

    // move the mouse while dragging
    useEffect(()=>{
    	window.addEventListener('mousemove', mouseMoveHandler);
    	return(()=>{
      		window.removeEventListener('mousemove', mouseMoveHandler);
    	})
  	}, [])  

    // Release the mouse
    useEffect(() => {
        const handler = (e) => {
          if (dragging !== null) {
            e.preventDefault();
            setDragging(null);
            setDropZone(0);

            var productArr = reorderList([...elements], dragging, dropZone);
            props.updateElementsCallback(productArr);
          }
        };
    
        document.addEventListener("mouseup", handler);
        return () => document.removeEventListener("mouseup", handler);
    });

    const reorderList = (elements, start, end) => {
        const temp = elements[start];
        if  (start < end) {
            for (let i=start; i < end; i++) {
                elements[i] = elements[i+1];
            }
            elements[end - 1] = temp;
        } else if (end < start) {
            for (let i = start; i > end; i--) {
                elements[i] = elements[i - 1];
            }        
            elements[end] = temp;          
        }
      
        return elements;
      };

    return (
        <table>
            {/* {dragging && <tr className={"table-row drop-zone " + (0 == dropZone ? "" : "hidden")}><td/><td/></tr>} */}
            {elements.map((element, index) => {
                var selected = selectedElement == index;
                var rowClass = "table-row " + (selected ? "selected-row" : ""); 
                if (index != dragging) {                        
                    return (    
                        <div>                            
                            <tr className={rowClass} index={index} key={element.id}>
                                <td style={{cursor:"grab"}} onMouseDown={() => {setDragging(index)}}><img src={DragIcon}/></td>
                                <td className="fill-width" onClick={updateSelection.bind(this, index)}>{element.productName}</td>
                                {!element.activeInd && <td><img src={HideIcon}/></td>}
                            </tr>
                            <tr className={"table-row drop-zone " + (index + 1 == dropZone ? "" : "hidden")}><td/><td/></tr>                        
                        </div>            
                    )
                } else {
                    return (
                        <tr className="table-row floating"        
                            style={{
                                left: `${mousePos.x}px`,
                                top: `${mousePos.y}px`,
                                width: "200px"
                            }}
                            index={index} key={element.id}>
                            <td style={{cursor:"grab"}} onMouseDown={() => {setDragging(index)}}><img src={DragIcon}/></td>
                            <td className="fill-width" onClick={updateSelection.bind(this, index)}>{element.productName}</td>
                        </tr>
                    )
                }
            }
            )}
        </table>
    )
}

export default DraggableTable;