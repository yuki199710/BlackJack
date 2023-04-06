const dealerSum = document.getElementById("dealer-sum");
const hidden = document.getElementById("hidden");
const dealerCard = document.getElementById("dealer-card");
const playerCard = document.getElementById("player-card");
const playerSum = document.getElementById("player-sum");
const hit = document.getElementById("hit");
const stand = document.getElementById("stand");
const result = document.getElementById("result");
const mess = document.getElementById("mess");
const restart = document.getElementById("restart");

let TotalDealer = [];
let TotalPlayer = [];
let AJQK = Number(10);

//カードの作成（マークと数字を合わせる）
let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
let mark = ["s","c","d","h"];
deck = [];
for(
    let i = 0 ; i < mark.length; i++
){
    for(
        let j = 0 ; j < values.length; j++
    ){
        deck.push(mark[i] + "-" + values[j]);
    }
}

//alert("G A M E  S T A R T");

function deal(dc,pc){
     //Dealerの最初の手札
     let dealertramp1 = deck.splice(Math.floor(Math.random() * deck.length),1)[0];
     let dData = dealertramp1.split("-");
     let dValue = Number(dData[1]);

     //Dealerの合計へ追加
     if(isNaN(dValue)){
        TotalDealer.push(AJQK);
     }else{
        TotalDealer.push(dValue);
     }

     //Dealerのトランプの表示
     let dealertramp1Img = document.createElement('img');
     dealertramp1Img.src= "card/" + dealertramp1 + ".png";
     dc.appendChild(dealertramp1Img);



     //Playerの1枚目の手札
     let playertramp1 = deck.splice(Math.floor(Math.random() * deck.length),1)[0];
     let pData = playertramp1.split("-");
     let pValue = Number(pData[1]);
     
     //Playerの２枚目の手札
     let playertramp2 = deck.splice(Math.floor(Math.random() * deck.length),1)[0];
     let pData2 = playertramp2.split("-");
     let pValue2 = Number(pData2[1]);
     
     //Playerのトランプ1の表示
     let playertramp1Img = document.createElement('img');
     playertramp1Img.src = "card/" + playertramp1 + ".png";
     pc.appendChild(playertramp1Img);

     //Playerのトランプ2の表示
     let playertramp2Img = document.createElement('img');
     playertramp2Img.src = "card/" + playertramp2 + ".png";
     pc.appendChild(playertramp2Img);
     
     //Playerの合計へ追加
     if(isNaN(pValue)){
        TotalPlayer.push(AJQK);
     }else{
        TotalPlayer.push(pValue)
     }
     if(isNaN(pValue2)){
        TotalPlayer.push(AJQK);
     }else{
        TotalPlayer.push(pValue2);
     }
   
}

deal(dealerCard,playerCard);


//配列内を合計する式
const Total = hands => {
    let sum = 0;
    for(let i = 0, len = hands.length; i < len; i++) {
      sum += hands[i];
    }
    return sum;
  };

//それぞれの合計の表示
dealerSum.textContent = Total(TotalDealer);
playerSum.textContent = Total(TotalPlayer);


//STANDした時の処理
stand.addEventListener("click", function(){
    //Dealerhiddenの追加
    let dealertramphidden = deck.splice(Math.floor(Math.random() * deck.length),1)[0];
    let dDatah = dealertramphidden.split("-");
    let dValueh = Number(dDatah[1]);

    //合計に追加
    if(isNaN(dValueh)){
        TotalDealer.push(AJQK);
    }else{
        TotalDealer.push(dValueh);
    }

    //hiddenカードの表示
    let dealertramphiddenImg = document.createElement('img');
    hidden.src = "card/" + dealertramphidden + ".png";

    //hidden合計の表示
    dealerSum.textContent = Total(TotalDealer);


    //Dealerの３枚目以降の手札
    while (Total(TotalDealer) <= 16) {
        let dealertramp3 = deck.splice(Math.floor(Math.random() * deck.length),1)[0];
        let dData3 = dealertramp3.split("-");
        let dValue3 = Number(dData3[1]);

        if(isNaN(dValue3)){
            TotalDealer.push(AJQK);
        }else{
            TotalDealer.push(dValue3);
        }

        let dealertramp3Img = document.createElement('img');
        dealertramp3Img.src = "card/" + dealertramp3 + ".png";
        dealerCard.appendChild(dealertramp3Img);

        dealerSum.textContent = Total(TotalDealer);
    }
     
    
    //BURST審査とcofirmによる結果表示と再挑戦の有無
    if(Total(TotalDealer) > 21){
        dealerSum.textContent = Total(TotalDealer);
        mess.textContent = "DEALERの手札が２１を超えBURSTです。"
        
        $('#modalArea').fadeIn();
        mess.textContent = "DEALERの手札が21を超えBURSTです"
        restart.addEventListener("click", function(){
            location.reload();
        });

        hit.disabled = true;
        stand.disabled = true;
        result.textContent = "YOU WIN！！";
    }else{
        //結果の算定
        if(Total(TotalDealer) >= Total(TotalPlayer)){
            result.textContent = "DEALER WIN ...";
            hit.disabled = true;
            stand.disabled = true;

            $('#modalArea').fadeIn();
            mess.textContent = "DEALERの勝ちです"
            restart.addEventListener("click", function(){
                location.reload();
            });

        }else{
            result.textContent = "YOU WIN！！"
            hit.disabled = true;
            stand.disabled = true;

            $('#modalArea').fadeIn();
            mess.textContent = "あなたの勝ちです"
            restart.addEventListener("click", function(){
                location.reload();
            });
        }   
        }
    });


//HITした時の処理
hit.addEventListener("click", function() {
     //Playerの３枚目の手札
     let playertramp3 = deck.splice(Math.floor(Math.random() * deck.length),1)[0];
     let pData3 = playertramp3.split("-");
     let pValue3 = Number(pData3[1]);
     
     //Playerの合計へ追加
     if(isNaN(pValue3)){
        TotalPlayer.push(AJQK);
     }else{
        TotalPlayer.push(pValue3);
     }

     //Playerのトランプ３の表示
     let playertramp3Img = document.createElement('img');
     playertramp3Img.src = "card/" + playertramp3 + ".png";
     playerCard.appendChild(playertramp3Img);

     //もう一度合計の表示
     playerSum.textContent = Total(TotalPlayer);

    //BURST審査とconfirmによる結果表示と再挑戦の有無
     if(Total(TotalPlayer) > 21){
           hit.disabled = true;
           stand.disabled = true;
           result.textContent = "GAME　OVER";

           $('#modalArea').fadeIn();
           mess.textContent = "手札が21を超えBURSTです"
           restart.addEventListener("click", function(){
            location.reload();
        });
        }
});

