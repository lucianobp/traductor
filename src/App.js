import React, { Component } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import './App.css';
import shuffle from 'shuffle-array';
import palabras from './palabras';


class SortableComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: (props.shuffleItems
        ? shuffle(props.items, { copy: true })
        : props.items),
      originalItems: props.items
    };
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };
  render() {
    const correctList = JSON.stringify(this.state.originalItems) === JSON.stringify(this.state.items)

    return <div style={{
      backgroundColor:'blue'
    }}>
      <SortableList items={this.state.items} onSortEnd={this.onSortEnd} lockAxis='y' originalItems={this.state.originalItems} />
    </div>
  }
}
//backgroundColor: correctList? 'blue' : 'orange'



const SortableItem = SortableElement(({ value, correctItem }) =>
  <div
    style={{
      margin: 5,
      border: "1px solid black",
      backgroundColor: correctItem? 'green': 'red'
    }}
  >
    {value}</div>
);

// item es correcto si: valor (en indice) = itemsOriginales (en indice)
const SortableList = SortableContainer(({ items, originalItems }) => {
  return (
    <div>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} correctItem={originalItems[index]===value} />
      ))}
    </div>
  );
});


const App = (JSON) => {
  return (
    <div>
      <div
        style={
          {
            width: '50%',
            float: 'left'
          }
        }><SortableComponent items={[1, 2, 3, 4, 5]} shuffleItems={false} /></div>
      <div style={
        {
          width: '50%',
          float: 'left'
        }} ><SortableComponent items={palabras.left} shuffleItems={true} /></div>
    </div>
  )
  
}

export default App;
