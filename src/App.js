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
    const showSuccess = this.props.shuffleItems && correctList

    return <div style={{
      backgroundColor: 'blue'
    }}>
      <SortableList items={this.state.items} onSortEnd={this.onSortEnd} lockAxis='y' originalItems={this.state.originalItems} />
      {showSuccess ? <button onClick={this.props.nextLevel}>CORRECTO</button> : null}
    </div>
  }
}
//backgroundColor: correctList? 'blue' : 'orange'



const SortableItem = SortableElement(({ value, correctItem }) =>
  <div
    style={{
      margin: 5,
      border: "1px solid black",
      backgroundColor: correctItem ? 'green' : 'red'
    }}
  >
    {value}</div>
);

// item es correcto si: valor (en indice) = itemsOriginales (en indice)
const SortableList = SortableContainer(({ items, originalItems }) => {

  return (
    <div>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} correctItem={originalItems[index] === value} />
      ))}
    </div>
  );
});


class App extends Component {
  state = {
    nivel: 0
  };
  subirNivel = () => {
    this.setState({ nivel: 1 + this.state.nivel });
  }

  render() {
    const Termine = this.state.nivel >= palabras.length
    if (Termine) {
      return (
        <div>
          <nav
            style={
              {

              }}
          >
            <h2>Felicitaciones, haz terminado ..</h2>

          </nav>
        </div>
      )
    }
    return (
      <div >
        <nav>
          <div>
            <div>

              <h2>Traductor nivel {this.state.nivel + 1}</h2>
            </div>


          </div>
        </nav>
        <div
          style={
            {
              width: '50%',
              float: 'left'
            }
          }>{React.createElement(SortableComponent, { key: "left" + this.state.nivel, items: palabras[this.state.nivel].left, shuffleItems: false })}</div>
        <div style={
          {
            width: '50%',
            float: 'right'
          }} ><SortableComponent nextLevel={this.subirNivel} key={"right" + this.state.nivel} items={palabras[this.state.nivel].right} shuffleItems={true} /></div>
        <div>

        </div>
      </div>


    )

  }
}
// <div>{JSON.stringify(palabras[this.state.nivel])}</div>

export default App;
