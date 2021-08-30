<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class LoginController extends Controller
{
    /*
        Body Request
        {
            "firstName": "Henry",
            "lastName": "Luu",
            "email": "email@email.com",
            "username": "HenryL",
            "password": "password123",
            "userType": "student"
        }
    */
    public function register(Request $request){
        $bodyContent = json_decode($request->getContent(), true);

        //Returns error if duplicate username
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

    /*
        Body Request
        {
            "username": "HenryL",
            "password": "password123"
        }
    */
    public function login(Request $request){
        $bodyContent = json_decode($request->getContent(), true);

        //Get user record
        $user = User::where('username', '=', $bodyContent['username'])->first();

        //Return error if no username is found
        if(!$user){
            $response['message'] = 'No account found';
            $response['success' ] = false;
            $response['status'] = 401;
            return response()->json($response, $response['status']);
        }

        //Returns error if password does not match
        if(!Hash::check($bodyContent['password'], $user->password)){
            $response['message'] = 'Incorrect password';
            $response['success'] = false;
            $response['status'] = 401;
            return response()->json($response, $response['status']);
        }

        //Returns successful login 
        $response['success'] = true;
        $response['status'] = 200;
        return response()->json($response, $response['status']);
    }
}
