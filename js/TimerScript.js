sw_status = 0;
reset_form();

/*
リセットボタン押下時の実行.
*/
function reset_form(){
    if(sw_status == 1){
        start_count();
    }
    timer = 0;
    money = 0;
    result_Message();
    document.form_sw.counter.value=count_format(0); // タイマのクリア.
    document.form_sw.Meeting_Money.value=0;         // 発生金額のクリア.
}

/*
会議出席者全員に対する1秒毎に発生する金額.
*/
function calc_money(){
    var M_salary = calc_sec_salary(document.form_salary.Manager_salary.value) * document.form_salary.Manager_Num.value;     // 部長分 発生金額
    var G_salary = calc_sec_salary(document.form_salary.GL_salary.value) * document.form_salary.GL_Num.value;               // 課長分 発生金額
    var C_salary = calc_sec_salary(document.form_salary.Chief_salary.value) * document.form_salary.Chief_Num.value;         // 係長分 発生金額
    var E_salary = calc_sec_salary(document.form_salary.Employee_salary.value) * document.form_salary.Employee_Num.value;   // 社員分 発生金額
    var Sum_salary = M_salary + G_salary + C_salary + E_salary;

    return Sum_salary;
}

/*
時給を秒毎に発生する給料に変換.
*/
function calc_sec_salary(salary){
    var buf = (10000/8)/20;
    var tsalary = (salary/60)/60 * buf;
    return tsalary;
}

/*
会議にて発生した費用を表示するためのメッセージ.
*/
function result_Message(){
    if(sw_status == 0){
        document.getElementById("Before_resultID").innerText = "" 
        document.getElementById("resultID").innerText = "";
        document.getElementById("After_resultID").innerText = "";
    }else{
        document.getElementById("Before_resultID").innerText = "発生費用は" 
        document.getElementById("resultID").innerText = document.form_sw.Meeting_Money.value;
        document.getElementById("After_resultID").innerText = "円!!";
    }
}

/*
スタート(ストップ)ボタン押下時の処理.
*/
function start_count(){
    if(sw_status == 0){
        result_Message();
        money = calc_money();
        document.form_sw.start.value = "ストップ";
        document.getElementById("resultID").innerText = "";
        sw_status = 1;
        timerID = setInterval("count_up()",1000);
    }else{
        result_Message();
        document.form_sw.start.value = "スタート";
        resultID
        sw_status = 0;
        clearInterval(timerID);
    }
}

/*
1秒カウントアップした際の処理.
*/
function count_up(){
    timer++;
    document.form_sw.counter.value = count_format(timer);
    document.form_sw.Meeting_Money.value = Math.floor(money * timer);
}

/*
タイマー表示のフォーマットを時分秒に変換するための処理.
*/
function count_format(num){
    var ts = num % 60;
    var tm = Math.floor(num /60);
    var th = Math.floor(tm/60);
    tm = tm % 60;
    return check_digit(th) + ":" + check_digit(tm) + ":" + check_digit(ts);
}

/*
数値が1桁であれば先頭に0(例：01)と表示させるための処理.
*/
function check_digit(num){
    var ret = num;
    if(num < 10){
        ret = "0" + num;
    }
    return ret;
}