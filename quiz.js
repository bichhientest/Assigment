var app=angular.module("myapp",[]);


app.directive("myquiz",function(myfactory){
    return {
        restrict: "AE",
        scope:{},
        templateUrl:'template-quiz.html',
        link:function(scope,elem,attrs){
            scope.start= function(){
                scope.id=0;
                scope.inProgess=true;
               scope.getquestion();

            };
            scope.reset=function(){
                scope.inProgess=false;
            }; 
            scope.getquestion= function(){
                var quiz=myfactory.getquestion(scope.id);
                if(quiz ){
                scope.question=quiz.Text;
                scope.options= quiz.Answers;
                scope.answer=quiz.AnswerId;
                }                               
            }
            scope.checkanswer= function(){
               // alert("answer")
               if(!$("input[name=answer]:checked").length)
               return;
            var ans=$("input[name=answer]:checked").val();
            if(ans ==scope.answer){
                alert("Đúng")
            }else{
                alert("Sai")
            }
            }
            scope.nextquestion= function(){
                scope.id++;
                scope.getquestion();
            }
            scope.reset();
        }
    }
});


app.factory("myfactory",function($http){
    $http.get('../db/Quizs/ADAV.js').then(function(res){
        question= res.data;
        alert("Start the Quiz để bắt đầu bài test!")
    });
    return {
        getquestion:function(id){
            return question[id];
        }
    }
});