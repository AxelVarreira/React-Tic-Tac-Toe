import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component { //componente 'square' e um controlled component by Board
//     // constructor(props){
//     //O Construtor do jogo foi passado para o componente 'Board', logo, este não existe mais
//     //     /**
//     //      * Em classes JavaScript, você sempre precisa chamar super ao definir o construtor de uma subclasse. Todas os componentes de classe React que possuem um método constructor devem iniciá-lo com uma chamada super (props).
//     //      */
//     //     super(props);
//     //     this.state = {
//     //         value: null,
//     //     }
//     // }

//     render() {
//       return (
//         <button
//          className="square" 
//          onClick={() => this.props.onCLick()} //Modificando o estado da prop Value
//          >
//           {this.props.value}
//         </button>
//       );
//     }
//   }

function Square(props){
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

/*
Dado um array de 9 quadrados, esta função irá verificar se há um vencedor e retornará 'X', 'O' ou null conforme apropriado 
 */
function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(let i=0; i<lines.length; i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a]=== squares[b] && squares[a]==squares[c]){
      return squares[a]
    }
  }
  return null;
}


  
class Board extends React.Component { //componente 'board'
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null), //prenchimento do tabuleiro com 'null'
    //         //Cada Square vai receber a proriedade value que vai ser 'X', 'O', ou null para quadrados vazios.
    //         xIsNext: true //Define 'X' sempre como player que inicia a jogada e serve como variavel de verificação
    //     }
    // }

    //guarda os elementos na board em vez do square, passando a ser o construtor do jogo
   
    renderSquare(i) { //criação do metodo renderSquare e passagemd e parametro
      return <Square 
      value={this.props.squares[i]} //pega o valor da prop squares
      onClick={() => this.props.onClick(i)} //chama a função hendleClick ao ser clicado
      />; //retorna o componente square com a PROPS value valendo 1
    }
  
    render() {
      // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  
      // const winner = calculateWinner(this.state.squares);
      // let status;
      // if(winner){
      //   status = "Winner: "+winner;
      // }else{
      //   status = "Next player: "+(this.state.xIsNext ? 'X': 'O');
      // }

      return (
        <div>
          {/* <div className="status">{status}</div> */}
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component { //Componente 'game'

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step%2) ===0,
    });
  }
  
  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber +1); 
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // const squares = this.state.squares.slice(); //faz uma copia do array de quadrados do Square component
    
    if(calculateWinner(squares) || squares[i]){ //trava o jogo caso o quadrado esteja preenchido ou aja algum vencedor
      return;
    }

    squares[i] = this.state.xIsNext ? 'X': 'O'; //Verifica se xIsNext é true, se for, o proximo a jogar é o X, se não, o proximo a jogar é o 'O'

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length, //modifica o stepNumber
      xIsNext: !this.state.xIsNext,
    });
}

  constructor(props){
    super(props)
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
        stepNumber: 0,
    };
  }
    render() {
      //Determinando e exibindo o status do jogo
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc =move?
        'Go to move#' + move:
        'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      let status;
      if(winner){
        status = 'Winner: '+winner;
      }else{
        status = 'Next player: '+(this.state.xIsNext ? 'X': 'O');
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i)=> this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  