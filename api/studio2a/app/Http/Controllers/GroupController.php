<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

use App\Models\Group;

class GroupController extends Controller
{
    public function create(Request $request)
    {
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

    public function retrieve(Request $request)
    {
        // returns all groups for a given projectID
        $groups = Group::all();
        if ($request->has('projectID')) {
            $groups = DB::select(
                'SELECT * 
                from ((users as u 
                INNER JOIN student_group_enrollment as e ON u.userID = e.userID)
                INNER JOIN proj_groups as g ON e.groupID = g.groupID)
                WHERE g.projectID = ?',
                [$request->projectID]
            );
        }
        return response()->json($groups);
    }
}
