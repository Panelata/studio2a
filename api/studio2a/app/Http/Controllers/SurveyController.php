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
    //returns all survey results if no parameters
    // eg: survey/retrieve
    //otherwise returns latest survey from subject
    // eg: survey/retrieve?subjectID=127

    {
        Log::debug("retrieving Survey...");
        $surveys = Survey::all();
        $response['success'] = true;
        $response['status'] = 200;


        if ($request->has('subjectID')) {
            $surveys = Survey::where('subjectID','=', $request->subjectID)->get();
            $latestsurvey = end($surveys); reset($surveys);
            return response()->json(end($latestsurvey));
        }

        return response()->json($surveys);
    }

    public function retrieveSkills(Request $request)
    //returns all skill mappings if no parameters
    // eg: survey/skills
    //returns skill mappings for given projectID
    // eg: survey/skills?projectID=3
    {
        Log::debug("retrieving Survey...");
        $skillmappings = SkillsMapping::all();

        if ($request->has('projectID')){
            $skillmappings = SkillsMapping::where('projectID', '=', $request->projectID)->get();
        }

        $response['success'] = true;
        $response['status'] = 200;
        return response()->json($skillmappings);
    }
}
