<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Group;

class GroupController extends Controller
{
    public function create(Request $request){
        $bodyContent = json_decode($request->getContent(), true);
        Log::debug($bodyContent);
        //Creates a new group
        $group = new Group;
        $group->projectID = $bodyContent['projectID'];
        $group->save();
// add more stuff to create a full group at once
        $response['success'] = true;
        $response['status'] = 200;
        return response()->json($response, $response['status']);
    }

    public function retrieve(){
        $groups = Group::all();
        return response()->json($groups);

    }

    
}
