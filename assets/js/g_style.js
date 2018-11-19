
var keyNums1 = new Array("1","2","3","4","5","删除");
var keyNums2 = new Array("6","7","8","9","0","清空");

/*数字键盘显示*/
$(function showKeyboard(){
    var keyboardUp=""
    for (var i = 0; i < keyNums1.length; i++) {
        keyboardUp += "<li>" + keyNums1[i] + "</li>";
    }
    $('.game_keyboard ul.keyBoardup').append(keyboardUp).show();
})

$(function showKeyboard(){
    var keyboardDown=""
    for (var i = 0; i < keyNums2.length; i++) {
        keyboardDown += "<li>" + keyNums2[i] + "</li>";
    }
    $('.game_keyboard ul.keyBoarddown').append(keyboardDown).show();
})

var codeLength;
$(function(){
    $(".game_easy").click(function() {
        localStorage.setItem(codeLength,3);
    });
    $(".game_normal").click(function() {
        localStorage.setItem(codeLength,4);
    });
    $(".game_hard").click(function() {
        localStorage.setItem(codeLength,5);
    });
})


/*被猜数*/
var code = [];
$(function(){
    var codeLength=localStorage.getItem(codeLength);
    //var localStorage.getItem(codeLength,3);
    //var codeLength = 3;
    var selectChar = new Array(0,1,2,3,4,5,6,7,8,9);


        for(var i=0;i<codeLength;i++) {
           var charIndex = Math.floor(Math.random()*selectChar.length);
            console.log(selectChar[charIndex]);
            code.push(selectChar[charIndex]);
            selectChar.splice(charIndex,1);
          /*code +=selectChar[charIndex];*/
        }

    console.log(code);
   /* showCheck(code);*/
})


/*input 输入*/
var next=0;
$(document).ready(function() {
    var nextMax=localStorage.getItem(codeLength);
    $(".game_keyboard ul li").click(function() {
        if ($(this).text() === "删除") {
             if ($(".ppHas").length == 1) {
                next = 0;
            }
            $(".ppHas:last").text("");
            $(".ppHas:last").removeClass("ppHas");
            next = next - 1;
            if (next < 1) {
                next = 0;
            }
        console.log('next1:',next);

        }else if($(this).text() === "清空"){
            $(".ppHas").text("");
            $(".ppHas").removeClass("ppHas");
            next = 0;

        }else {
            console.log('next2:',next);
            for (var i = 0; i < $(".guess").length; i++) {
                $(".guess:eq(" + next + ")").text($(this).text());
                $(".guess:eq(" + next + ")").addClass("ppHas");
                next = next + 1;
                if (next > nextMax-1) {
                    next = nextMax;
                }
                return
            }

    }

    })
});


/*对比*/
var arr = [];
var count = 0;
$(function() {
    $(".testbtn").click(function() {
        /* Act on the event */
        var arr = [];
        var st=localStorage.getItem(codeLength);

        next=0;
        $(".guess_list ul li.guess").each(function() {
            console.log('$(this).val():',$(this).text());
            var aaa = parseInt($(this).text());
            arr.push(aaa);
            console.log('arr:',arr);
        });
         //alert(isRepeat(arr));
         //alert(hasNaN(arr));
         $(".guess").text("");
         if(hasNaN(arr)){
            alert('猜测数不能为空');
            return
        }
        if(isRepeat(arr)){
            alert('请勿输入重复数字');
            return
        }
        else {
            if(st==4){
                count++;
                $(".times").text(count);
                if(count == 11){
                    alert('次数耗尽，请重新开始');

                    location.reload();
                }
            }
            if(st==5){
                if(out!=null){
                     clearTimeout(out);
                     out=null;
                     countTime = 30;
                 }
                countDown();
                countNumber++;
                $(".times").text(countNumber);
                if(countNumber == 10){
                    alert('次数耗尽，请重新开始');

                    location.reload();
                }

            }
            judgeRepeat(arr,st)
            /*$(".times").text("");*/

        };

    });
})
$(function(){
    $(".header_tips").click(function() {
        $(".left_popup").show();
    });
    $(".left_popup i.iclose").click(function() {
        $(".left_popup").fadeOut(300);
    });
    $(".header_menu").click(function() {
        $(".right_popup").show();
    });
    $(".game_on").click(function() {
        $(".right_popup").fadeOut(300);
    });
    $(".game_restart").click(function() {
        $(".right_popup").fadeOut(300);
        location.reload();
    });
})

//判断输入是否有重复
function isRepeat(arr){

    var hash = {};

    for(var i in arr) {

        if(hash[arr[i]])  //判断是否存在该元素

         return true;

            hash[arr[i]] = true;

        }

        return;

    }
//判断输入是否有空值
function hasNaN(arr) {
    var  a = NaN;a !== NaN
  for (var i = 0, len = arr.length; i < len; i++) {
    if (isNaN(arr[i])){
      return true
    }
  }
  return
}

//对比猜数和被猜数
function judgeRepeat(arr,st) {
    var arry1 = code;

            var arry2 = arr;

            var arry3 = new Array();
            var arry4 = new Array();

            var j = 0;
            var w = 0;

            for (var i = 0; i < arry1.length; i++) {

                for (var k = 0; k < arry2.length; k++) {

                    if (arry1[i] == arry2[k]) {

                        arry3[j] = arry1[i];

                        ++j;

                    };

                    if ((arry1[i] == arry2[k]) && (i === k)) {

                        arry4[w] = arry1[i];

                        j--;
                        w++;

                    };
                }

            };
            if(w == st){
                alert('恭喜您！');
                location.reload();
            };

            var result_list="";
            result_list+= '<li><div class="result_list">';
            for (var i =0 ; i< arr.length; i++) {
                result_list+='<span class="number_list">'+arr[i]+'</span>';
            }
            result_list+= "</div>";
            result_list+= '<p class="number_result">'+j+"ball/"+w+"st</p>";
            result_list+= "</li>";

            $('.game_result ul').prepend(result_list).show();
            /*$('.game_result ul').append(result_list).show();*/
            console.log(arry3)
            console.log('j:',j)
            console.log(arry4)
            console.log('w:',w)
}


/*倒计时及次数限定*/
var countTime = 30;
var countNumber = 0;
var out;
/*倒计时*/
function countDown(){
   $('.countDown').text(countTime);
    out = setTimeout(countDown,1000);
    countTime--;
    if(countTime < 0)
    {
      countTime = 30;
      countNumber++;
      $(".times").text(countNumber);
    }
    if(countNumber == 10){
        alert('次数耗尽，请重新开始');

        location.reload();
    }

}
 //暂停
 function doPause(){
     if(out!=null){
         clearTimeout(out);
         out=null;
     }
     document.getElementById("tid").disabled=true;
     document.getElementById("gid").disabled=false;
 }
 //继续
 function doGo(){
     countDown();
     document.getElementById("tid").disabled=false;
     document.getElementById("gid").disabled=true;
 }


/*function tishi(content,url) {
$(document.body).append(html);
$("#msg").show();
$(".msg").html(content);
if(url){
window.setTimeout("location.href='"+url+"'", 1500);
}else{
setTimeout('$("#msg").fadeOut()', 1500);
}
}
tishi('留言成功');*/

 /*弹出提示*/
 $(function() {
     $(".tips_logo").click(function(event) {
         //取消冒泡事件
         event.stopPropagation(); //这句是必须
         $(".tips_intro").slideToggle();
     });

     //点击空白或者其他区域时intro隐藏
     $(document).click(function() {
         $(".tips_intro").fadeOut(500);
     });
 });
