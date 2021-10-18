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
}
