<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

class SurveyController extends Controller
{
    public function createSurvey(Request $request){
        $bodyContent = json_decode($request->getContent(), true);
        Log::debug("Creating survey");
        Log::debug($bodyContent);
    }
}
