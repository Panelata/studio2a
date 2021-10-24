<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

use App\Models\Group;
use App\Models\StudentGroupEnrollment;


class GroupController extends Controller
{
    public function create(Request $request)
    {
        $bodyContent = json_decode($request->getContent(), true);
        Log::debug($bodyContent);
        //Creates a new group
        $newGroups = array();
        foreach ($bodyContent['groups'] as $group) {
            $newGroup = new Group;
            $newGroup->projectID = $bodyContent['projectID'];
            $newGroup->save();
            $newGroupID =  $newGroup->groupID;
            foreach ($group as $user) {
                $newStuGroupEnrollment = new StudentGroupEnrollment;
                $newStuGroupEnrollment->groupID = $newGroupID;
                $newStuGroupEnrollment->userID = $user;
                $newStuGroupEnrollment->save();
            }
            array_push($newGroups, $group);
        }

        // add more stuff to create a full group at once
        $response['success'] = true;
        array_push($newGroups, $response["success"]);
        $response['status'] = 200;
        return response()->json($newGroups, $response['status'],);
    }

    public function retrieve(Request $request)
    {
        // returns all groups for a given projectID
        $groups = Group::all();
        if ($request->has('projectID')) {
            $groups = DB::select(
                'SELECT u.firstName, u.lastName, u.userID, g.groupID
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
