<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class LoginController extends Controller
{
    public function register(Request $request){
        $bodyContent = json_decode($request->getContent(), true);

        //Checks if username already exists
        $exist = User::where('username', '=', $bodyContent['username'])->first();
        if($exist){
            $response['success'] = false;
            $response['status'] = 400;
            $response['message'] = 'Duplicate username';
            return response()->json($response, $response['status']);
        }

        //Creates new user
        $user = new User;
        $user->firstName = $bodyContent['firstName'];
        $user->lastName = $bodyContent['lastName'];
        $user->email = $bodyContent['email'];
        $user->userType = $bodyContent['userType'];
        $user->username = $bodyContent['username'];
        $user->password = Hash::make($bodyContent['password']);
        $user->save();

        $response['success'] = true;
        $response['status'] = 200;
        return response()->json($response, $response['status']);
    }

    public function login(Request $request){
        Log::debug("Hit Login");
    }
}
