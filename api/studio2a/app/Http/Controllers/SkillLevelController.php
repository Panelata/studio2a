<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Log;

use App\Models\SkillLevel;

class SkillLevelController extends Controller
{
    public function createSkillLevel(Request $request){
        $bodyContent = json_decode($request->getContent(), true);
        Log::debug("Creating skill level");
        Log::debug($bodyContent);

        //Creates new survey
        $survey = new SkillLevel;
        $survey->mappingID = $bodyContent['mappingID'];
        $survey->userID= $bodyContent['userID'];
        $survey->score = $bodyContent['score'];
        $survey->save();

        $response['success'] = true;
        $response['status'] = 200;
        return response()->json($response, 200);
    }
    
}
