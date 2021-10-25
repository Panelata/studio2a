<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('test', 'TestController@test');

//Login endpoints
$router->post('register', 'LoginController@register');
$router->post('login', 'LoginController@login');
$router->post('login/token', 'LoginController@checkToken');

//Skill_Level endpoints
$router->post('skillLevel', 'SkillLevelController@createSkillLevel');

//Survey Endpoints
$router->post('survey', 'SurveyController@createSurvey');
$router->get('survey/retrieve', 'SurveyController@retrieveSurvey');
$router->get('survey/skills', 'SurveyController@retrieveSkills');
$router->get('survey/students', 'SurveyController@retrieveStudents');
$router->get('survey/responses', 'SurveyController@retrieveResponses');


//class endpoints
$router->post('subject/create', 'SubjectController@create');
$router->get('subject/retrieve', 'SubjectController@retrieve');


//group endpoints
$router->post('groups/create', 'GroupController@create');
$router->get('groups/retrieve', 'GroupController@retrieve');
