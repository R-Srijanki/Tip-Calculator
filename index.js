const bill=document.getElementById('bill');
const custom=document.getElementById('cust');
const per=document.getElementById('People');
const pertip=document.getElementById('pertip');
const perbill=document.getElementById('perbill');
const err=document.getElementById('error');
const txbtn=document.querySelectorAll('.but');
const reset=document.getElementById('reset');
const pdiv=document.getElementById('pdiv');
const peerr=document.getElementById('peerr');
const divbill=document.getElementById('divbill');
let tx;

bill.addEventListener('input',() => check(bill));
custom.addEventListener('input',()=> check(custom));
per.addEventListener('input',function(){
    per.classList.add('border-green-300');
    if (per.value <= 0) {
        pdiv.classList.add('border-red-500');
        err.classList.remove('hidden');
        err.innerText = "Enter valid no. of people";
        peerr.classList.remove('hidden');
        return;
    }
    err.classList.add('hidden');
    pdiv.classList.remove('border-red-500'); // optional: remove error highlight
    peerr.classList.add('hidden');
    calculate();
    //console.log(per.value);    
});
function check(ele){
   
    let x=ele.value;
   if(!(/^\d+(\.\d+)?$/.test(x))){
        err.classList.remove('hidden');
       err.innerText="Enter valid number";
        setTimeout(() => {
            err.classList.add('hidden');
        }, 2000);
        return;
    }
    calculate();
    //console.log(x);
}

txbtn.forEach((element) => {
  element.addEventListener("click", function (e) {
    tx = e.target.value;

    // reset all buttons to dark green
    txbtn.forEach((btn) => {
      btn.classList.remove("bg-cyan-300","text-green-900");
      btn.classList.add("bg-cyan-900","text-white");
    });

    // make clicked button light green
    e.target.classList.remove("bg-cyan-900","text-white");
    e.target.classList.add("bg-cyan-300","text-green-900");

    calculate();
  });
});

function calculate(){
   // console.log("in enter");
    //console.log(tx);
    
        if(bill.value && (custom.value || tx) && per.value){
        tx=tx?tx:custom.value;
        let tip=(Number(bill.value)*Number(tx))/100;
        tip=tip/Number(per.value);
        //console.log(tip);
        pertip.innerText=`$${tip.toFixed(2)}`;
        let billy=Number(bill.value)/Number(per.value);
        billy+=tip;
        //console.log(billy);
        perbill.innerText=`$${billy.toFixed(2)}`;
        reset.disabled = false;
    }
    
}

reset.addEventListener('click',()=>{
    perbill.innerText=`$0.00`;
    pertip.innerText=`$0.00`;
    bill.value = "";
    per.value = "";
    custom.value = "";
    tx = null;
    reset.disabled = true;
    txbtn.forEach((btn) => {
      btn.classList.remove("bg-cyan-400","text-green-900");
      btn.classList.add("bg-cyan-900","text-white");
    });
});