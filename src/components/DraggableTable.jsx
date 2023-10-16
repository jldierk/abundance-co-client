import { useState } from "react";

const DraggableTable = (props) => {
    var elements = props.elements;
    const [dragging, setDragging] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);

    function updateSelection(index) {
        setSelectedElement(index);
        props.updateSelectedCallback(elements[index]);                        
    }

    return (
        <table>
            {elements.map((element, index) => {
                var selected = selectedElement == index;
                var rowClass = "table-row " + (selected ? "selected-row" : ""); 
                if (index != dragging) {                        
                    return (
                        <tr className={rowClass} onClick={updateSelection.bind(this, index)}>
                            <td>{element.productName}</td>
                        </tr>
                    )
                }
            }
            )}
        </table>
    )
}

export default DraggableTable;