<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Subject;

class SubjectController extends Controller
{
    public function create(Request $request){
        $bodyContent = json_decode($request->getContent(), true);
        Log::debug($bodyContent);
        //Creates a new subject
        $subject = new Subject;
        $subject->subjectName = $bodyContent['subjectName'];
        $subject->save();

        $response['success'] = true;
        $response['status'] = 200;
        return response()->json($response, $response['status']);
    }

    public function retrieve(){
        $subjects = Subject::all();
        return response()->json($subjects);

    }

    
}




