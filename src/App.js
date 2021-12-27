import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import './Styles/header.css'
import PersonIcon from '@material-ui/icons/Person';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AddIcon from '@material-ui/icons/Add';
import EventNoteIcon from '@material-ui/icons/EventNote';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';



const itemsFromBackend = [
  { id: uuidv4(), content: "Motao website design" },
  { id: uuidv4(), content: "Todo List" },
  { id: uuidv4(), content: "Drag & Drop" },
  { id: uuidv4(), content: "Employee List Demo" },
  { id: uuidv4(), content: "Template" }
];

const columnsFromBackend = {
  [uuidv4()]: {
    name: "In Progress",
    items: itemsFromBackend
  },
  [uuidv4()]: {
    name: "Completed",
    items: []
  },
  [uuidv4()]: {
    name: "TODO",
    items: []
  },
  [uuidv4()]: {
    name: "Add Section",
    items: []
  }
};



const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;


  // const array = [itemsFromBackend.content]
  // console.log(array.length)


  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    console.log(sourceColumn)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
    // console.log(sourceColumn)
  }
  else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    // console.log(copiedItems)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [anchor, setAnchor] = React.useState(null);

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}>

          {Object.entries(columns).map(([columnId, column], index) => {
            console.log(column)
            return (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* // key={columnId} */}

                <div style={{ 'height': '100px', 'width': '500px' }}>

                  <hr></hr>
                  <div style={{ margin: 8, background: '#f8f9fe', padding: '20px 20px', 'border-radius': '13px', 'border': '1px solid #e8eaf2' }}>
                    <div style={{ margin: '0 0 8px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', 'alignItems': 'center' }}>
                        <h2>{column.name}</h2>
                        <h3 style={{ 'display': 'flex', marginLeft: '10px', alignItems: 'center', fontSize: '15px', letterSpacing: '1px', marginBottom: '0', color: '#007aff' }}>({column.items.length})</h3>
                      </div>
                      <div><IconButton ><AddIcon /></IconButton>
                        <IconButton  >


                          <MoreHorizIcon onClick={handleClick} />

                          <Menu
                            // id="fade-menu"
                            anchorEl={anchor}
                            keepMounted
                            open={anchor}
                            onClose={handleClose}
                            TransitionComponent={Fade}>

                            <MenuItem >Edit Section</MenuItem>
                            <MenuItem>Delete Section</MenuItem>
                          </Menu>



                        </IconButton>

                      </div>
                    </div>
                    <hr></hr>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver ? "#f8f9fe" : "#f8f9fe", minHeight: 500,
                            }}>

                            {column.items.map((item, index) => {
                              return (
                                <Draggable key={item.id} draggableId={item.id}
                                  index={index}>
                                  {(provided, snapshot) => {
                                    {/* console.log(provided) */ }
                                    return (
                                      <div className="cardDiv"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none", 'border-radius': '20px', padding: 16, margin: "0 0 20px 0", minHeight: "50px", backgroundColor: 'white' ? "#ffffff" : "#f8f9fe", color: "black",
                                          ...provided.draggableProps.style
                                        }}>
                                        <div style={{ 'display': 'flex', 'justify-content': 'space-between' }}><h5>{item.content}</h5>
                                          <button type="button" style={{ 'float': 'right' }} className="btn border personIcon" ><MoreHorizIcon />
                                          </button>
                                        </div>
                                        <br></br>
                                        <br></br>
                                        <button type="button" className="tage btn border border-primary text-primary ">No Tags <LocalOfferIcon />
                                        </button>
                                        <button type="button" style={{ 'float': 'right' }} className="btn btn-success personIcon"><PlayArrowIcon />
                                        </button>
                                        <hr></hr>
                                        <IconButton ><PersonIcon /></IconButton> <IconButton><EventNoteIcon /></IconButton>

                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div >
    </>
  );
}

export default App;
