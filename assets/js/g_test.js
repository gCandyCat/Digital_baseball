/*    $(function(){
        for(var i = 0; i<$(".guess").length;i++){
            var t = $(".guess")[i];
            t.index = i;
            t.setAttribute("readonly", true);
            t.onkeyup=function(){
                this.value=this.value.replace(/^(.).*$/,'$1');
                var next = this.index + 1;
                if(next > $(".guess").length - 1) return;
                $(".guess")[next].removeAttribute("readonly");
                $(".guess")[next].focus();
            }
        }
        $(".guess")[0].removeAttribute("readonly");
    })*/
var keyNums = new Array("1","2","3","4","5","删除","6","7","8","9","0",
            "清空");





/*input 输入*/

$(document).ready(function() {

    $("#a").focus();
    //自动跳到下一个输入框
    $("input[name^='a']").each(function() {
        console.log('input:',$(this))
        $(this).keyup(function(e) {
            e = window.event || e;
            var k = e.keyCode || e.which;
            if (k == 8) { //8是Backspace键
              /*console.log(this);*/
                if ($(this).val().length < 1) {
                    $(this).prev().focus();
                    $(this).prev().focus(function() {
                        var obj = e.srcElement ? e.srcElement : e.target;
                        if (obj.createTextRange) { //IE浏览器
                            var range = obj.createTextRange();
                            range.moveStart("character", 1);
                            range.collapse(true);
                            range.select();
                        }
                    });
                }
            } else {
                if ($(this).val().length > 0) {
                    $(this).next().focus();
                }
            }
        })
        
    });
   /* $("input[type='text'][id^='sn']").bind('keyup',
        function() {
            var len = $("#sn1").val().length + $("#sn2").val().length + $("#sn3").val().length + $("#sn4").val().length;
            if (len == 4) device_verify();
        });*/
});

/*被猜数*/
var code = []; 
$(function(){       
         
    var codeLength = 3;
    var selectChar = new Array(0,1,2,3,4,5,6,7,8,9);      
    
        
        for(var i=0;i<3;i++) {
           var charIndex = Math.floor(Math.random()*selectChar.length);    
            console.log(selectChar[charIndex]);
            code.push(selectChar[charIndex]);
            selectChar.splice(charIndex,1);
          /*code +=selectChar[charIndex];*/
        }       
    
    console.log(code);
   /* showCheck(code);*/
})

/*对比*/
var arr = [];
$(function() {
    $(".testbtn").click(function() {
        /* Act on the event */
        var arr = [];
        $("input[name^='a']").each(function() {
            var aaa = parseInt($(this).val());
            arr.push(aaa);
            console.log(arr)
        });

        $(".guess").val("");
        $("#a").focus();

        $(function() {
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
            var result_list="";
            result_list+= '<li><div class="result_list">';
            for (var i =0 ; i< arr.length; i++) {
                result_list+='<span class="number_list">'+arr[i]+'</span>';
            }
            result_list+= "</div>";
            result_list+= '<p class="number_result">'+j+"ball&nbsp;/&nbsp;"+w+"st</p>";
            result_list+= "</li>";

            $('.game_result ul').append(result_list).show();
            console.log(arry3)
            console.log(j)
            console.log(arry4)
            console.log(w)
            /*for(var i=0;i<result.length;i++){
                    //显示每个景区图片，景区名，详情介绍，链接
                  minorities+=((i%3==0 && (i>0)) ? '</li><li>':' ')
                            +'<div class="g_gzminority_list">'
                            +    '<div class="g_gzminority_img">'
                            +      '< a href=" '+result[i].id+'">'
                            +        '< img src="'+returnalyimgurl()+result[i].imgurl+'" onerror="javascript:this.src=\'../common/images/errorimg.jpg\'"/></ a>'
                            +      '</div>'
                            +      '<div class="g_gzminority_inner">'
                            +      '<h3>< a href="minorityDetails.html?id='+result[i].id+'" id="minority_Name">'+result[i].title+'</ a></h3>'
                            +      '<span>'+cutCHNString(owneridformate(result[i].urladress),46)+'</span>'
                            +       '<p>'+cutCHNString(result[i].sumary,120)+'</p >'
                            +  '</div></div>';
                    }
                minorities+='</li>';
                $('#show_minority').append(minorities).show();
            }*/
        })
    });
})



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
     //点击divTop自身隐藏
     $(".tips_intro").click(function() {
         $(this).fadeOut(500);
     })
 });