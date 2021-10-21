<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

use App\Models\Survey;
use App\Models\SkillsMapping;

class SurveyController extends Controller
{
    public function createSurvey(Request $request){
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
        foreach($bodyContent['skills'] as $skill){
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

    {
        Log::debug("retrieving Survey...");
        $surveys = Survey::all();
        $response['success'] = true;
        $response['status'] = 200;

        return response()->json($surveys);
    }

    public function retrieveSkills(Request $request)
    //returns all skill mappings if no parameters
    // eg: survey/skills
    //returns skill mappings for given projectID
    // eg: survey/skills?projectID=3
    {
        Log::debug("retrieving Survey...");

        $skills = SkillsMapping::join('survey', 'survey.projectID', '=', 'skills_mapping.projectID')
        ->get(['survey.subjectID','survey.projectID', 'survey.projectName', 'skills_mapping.skills']);

        if ($request->has('projectID')){
            $skills = SkillsMapping::join('survey', 'survey.projectID', '=', 'skills_mapping.projectID')
            ->where('skills_mapping.projectID', '=', $request->projectID)
            ->get(['survey.subjectID','survey.projectID', 'survey.projectName', 'skills_mapping.skills']);
        }
        $response['success'] = true;
        $response['status'] = 200;
        return response()->json($skills);
    }


}
