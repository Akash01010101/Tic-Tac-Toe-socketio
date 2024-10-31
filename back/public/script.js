let board = [];
const socket = io()
let turn = 0;
let form =  document.getElementById("form");
let clone = document.getElementById("game");
let p1_name;
let p2_name;
form.addEventListener("submit", (e)=>{
    e.preventDefault();
        const form = document.getElementById("form");
        p1_name = form.p1.value;
        p2_name = form.p2.value;
        const data = {p1_name,p2_name}
        socket.emit("ujoin",data)
          
        })
        socket.on("connected-2-p",()=>{
        })
        socket.on("playas",(ps)=>{
          const t = document.getElementById("form-div");
          const players = ps.data;
          t.innerHTML = '';
          let grid = document.getElementById("game");
          grid.style.display='grid'
          for (let i=0; i<9; i++)
            {
                let ch = document.createElement("div");
                grid.appendChild(ch);
                ch.className = "item";
                ch.id = `items${i}`;
                document.getElementById(`items${i}`).addEventListener("click", function move() {
                    if(ps.ps == 'X' && turn %2 == 0){
                        if (board[i] == undefined && players.p1_name == p1_name){
                          document.getElementById(`items${i}`).innerHTML = "X";
                        turn +=1;
                        board[i] = 'X';
                        socket.emit("move",{board,turn,players});
                        checkWin(players.p1_name,players.p2_name);
                        }
                        
                    }
                    else if(ps.ps == 'O' && !(turn %2 == 0))
                    {
                      if (board[i] == undefined && players.p1_name == p1_name){
                        document.getElementById(`items${i}`).innerHTML = "O";
                        turn +=1;
                        board[i] = 'O';
                        socket.emit("move",{board,turn,players});
                        checkWin(players.p1_name,players.p2_name);
                      }
                        
                    }
                }
                )
            }
        })
        socket.on("rec",(data)=>{
          
          if(p1_name == data.players.p1_name || p2_name == data.players.p1_name ){
            turn = data.turn;
          board= data.board;
            for(i=0;i<9;i++){
              if(board[i] != undefined){document.getElementById(`items${i}`).innerHTML = board[i]; checkWin(data.players.p1_name,data.players.p2_name);}
            }
          }
          
        })


function checkWin(x,y)
{
  if(x == p1_name || x == p2_name){
    for (let i = 0; i<=6; i++)
      {
         if (i<=2)
          {
              if ( board[(i+3)] ==  'X' && board[(i+6)] ==  'X' && board[i] ==  'X')
                  {
                      document.getElementById("winner").innerHTML = `X Wins`;
                      setTimeout(() => {location.reload();},1500);
                      socket.emit("win",{x,y})
                      return true;
                  }
              else  if ( board[(i+3)] ==  'O' && board[(i+6)] ==  'O' && board[i] ==  'O')
                  {
                          document.getElementById("winner").innerHTML =`O Wins`;
                          setTimeout(() => {location.reload();},1500);
                          socket.emit("win",{x,y})
                          return true;
                  }
          }
          if (i == 0|| i == 3 || i == 6 )
              {
                  if ( board[(i+1)] ==  'X' && board[(i+2)] ==  'X' && board[i] ==  'X')
                      {
                          document.getElementById("winner").innerHTML = `X Wins`;
                          setTimeout(() => {location.reload();},1500);
                          socket.emit("win",{x,y})
                          return true;
                      }
                      else  if ( board[(i+1)] ==  'O' && board[(i+2)] ==  'O' && board[i] ==  'O')
                      {
                          document.getElementById("winner").innerHTML =`O Wins`;
                          setTimeout(() => {location.reload();},1500);
                          socket.emit("win",{x,y})
                          return true;
                      }
              }
         
          if (i == 0 )
              {
                  if (board[i + 4] == 'X' && board[i + 8] == 'X' && board[i] =='X')
                      {
                          document.getElementById("winner").innerHTML = `X Wins`;
                          setTimeout(() => {location.reload();},1500);
                          socket.emit("win",{x,y})
                          return true;
                      }
                      else if (board[i + 4] == 'O' && board[i + 8] == 'O' && board[i] == 'O')
                          {
                              document.getElementById("winner").innerHTML = `O Wins`;
                              setTimeout(() => {location.reload();},1500);
                              socket.emit("win",{x,y})
                              return true;
                          }
              }
              if (i == 2)
                  {
                      if (board [i + 2] == 'X' && board[i + 4] == 'X' && board[i] == 'X' )
                          {
                              document.getElementById("winner").innerHTML = `X Wins`;
                              setTimeout(() => {location.reload();},1500);
                              socket.emit("win",{x,y})
                              return true;
                          }
                          else if (board [i + 2] == 'O' && board[i + 4] == 'O' && board[i] == 'O')
                              {
                                  document.getElementById("winner").innerHTML = `O Wins`;
                                  setTimeout(() => {location.reload();},1500);
                                  socket.emit("win",{x,y})
                                  return true;
                              }
                  }
          if (turn == 9)
              {
                  document.getElementById("winner").innerHTML = `Draw`;
                                  setTimeout(() => {location.reload();},1500);
                                  socket.emit("win",{x,y})
                                  return true;
              }
      }
      
  }
}
