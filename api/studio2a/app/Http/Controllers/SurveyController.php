<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use App\Models\Survey;
use App\Models\SkillsMapping;
use App\Models\User;

class SurveyController extends Controller
{
    public function createSurvey(Request $request)
    {
        $bodyContent = json_decode($request->getContent(), true);
        Log::debug("Creating survey");
        Log::debug($bodyContent);

        //Creates new survey
        $survey = new Survey;
        $survey->projectName = $bodyContent['projectName'];
        $survey->size = $bodyContent['size'];
        $survey->subjectID = $bodyContent['subjectID'];
        $survey->save();

        Log::debug($survey);
        Log::debug("Making skills mapping");
        //Loops through skills and create the survey mappings for these
        foreach ($bodyContent['skills'] as $skill) {
            $mapping = new SkillsMapping;
            $mapping->projectID = $survey->projectID;
            $mapping->skills = $skill;
            $mapping->save();
        }

        $response['success'] = true;
        $response['status'] = 200;
        return response()->json($response, 200);
    }

    public function retrieveSurvey(Request $request)
    //returns all survey results 
    // eg: survey/retrieve
    //returns all surveys available for given subject
    // eg: survey/retrieve?subjectID=1

    {
        Log::debug("retrieving Survey...");
        $surveys = Survey::all();
        $response['success'] = true;
        $response['status'] = 200;

        if ($request->has('subjectID')) {
            $surveys = Survey::where('subjectID', '=', $request->subjectID)
                ->get();
        }

        return response()->json($surveys);
    }

    public function retrieveSkills(Request $request)
    //returns all skill mappings if no parameters
    // eg: survey/skills
    //returns skill mappings for given projectID
    // eg: survey/skills?projectID=3
    //returns skills mapping for all projects of subject if passed subjectID
    // eg: survey/skills?subjectID=1
    {
        Log::debug("retrieving Survey...");

        $skills = SkillsMapping::join('survey', 'survey.projectID', '=', 'skills_mapping.projectID')
            ->get(['mappingID', 'survey.subjectID', 'survey.projectID', 'survey.projectName', 'skills_mapping.skills']);

        if ($request->has('projectID')) {
            $skills = SkillsMapping::join('survey', 'survey.projectID', '=', 'skills_mapping.projectID')
                ->where('skills_mapping.projectID', '=', $request->projectID)

                ->get(['mappingID', 'survey.subjectID', 'survey.projectID', 'survey.projectName', 'skills_mapping.skills']);
        }

        if ($request->has('subjectID')) {
            $skills = SkillsMapping::join('survey', 'survey.projectID', '=', 'skills_mapping.projectID')
                ->where('survey.subjectID', '=', $request->subjectID)
                ->get(['mappingID', 'survey.subjectID', 'survey.projectID', 'survey.projectName', 'skills_mapping.skills']);
        }

        $response['success'] = true;
        $response['status'] = 200;
        return response()->json($skills);
    }

    public function retrieveStudents(Request $request)
    //returns all students who have responded to a survey based on the project Id
    // eg: survey/retrieve?projectId=1

    {
        Log::debug("retrieving Survey...");
        $students = User::all();
        $response['success'] = true;
        $response['status'] = 200;

        if ($request->has('projectID')) {
            $students = DB::select('SELECT users.userID, users.firstName, users.lastName FROM ((users 
            INNER JOIN skill_level ON users.userID = skill_level.userID ) 
            INNER JOIN skills_mapping ON skill_level.mappingID = skills_mapping.mappingID)
            WHERE skills_mapping.projectID = ? GROUP BY  users.userID', [$request->projectID]);
        }

        return response()->json($students);
    }


    public function retrieveResponses(Request $request)
    //returns all responses based on a the project Id
    // eg: survey/responses?projectId=1

    {
        Log::debug("retrieving Survey Responses...");
        $students = User::all();
        $response['success'] = true;
        $response['status'] = 200;

        if ($request->has('projectID')) {
            $students = DB::select('SELECT lev.userID, lev.score, map.mappingID, map.skills
            FROM skill_level as lev, skills_mapping as map
            WHERE lev.mappingID = map.mappingID AND map.projectID = ?
            ORDER BY lev.userID', [$request->projectID]);
        }

        return response()->json($students);
    }
}
