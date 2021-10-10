<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
use App\Models\SessionToken;

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

        //Expires all previous tokens
        SessionToken::where('userID', '=', $user->userID)
        ->where('expired', '=', 0)
        ->update([
            'expired' => 1
        ]);

        //Creates session token
        $today = date('H:i:s d-m-Y');
        $token = new SessionToken;
        $token->userID = $user->userID;
        $token->token = uniqid(rand()) . uniqid();
        $token->expired = '0';
        $token->expiryDateTime = date('H:i:s d-m-Y', strtotime($today . ' + 7 days'));
        $token->save();

        //Returns successful login 
        $response['userType'] = $user->userType;
        $response['token'] = $token->token;
        $response['success'] = true;
        $response['status'] = 200;
        return response()->json($response, $response['status']);
    }

    public function checkToken(Request $request){
        $bodyContent = json_decode($request->getContent(), true);

        //Checks if the token exist and if it has expired yet
        $today = strtotime(date('H:i:s d-m-Y'));

        //If no token is returned, then token is expired
        $token = SessionToken::where('token', '=', $bodyContent['token'])->where('expired', '=', '0')->first();
        if(!$token){
            $response['status'] = 200;
            $response['success'] = false;
            return response()->json($response, 200);
        }

        $tokenTime = strtotime($token->expiryDateTime);

        if($today > $tokenTime){
            //Token is expired, setting the expired value to 1
            SessionToken::where('id', '=', $token->id)
            ->update([
                'expired' => 1
            ]);
            $response['status'] = 200;
            $response['success'] = false;
            return response()->json($response, 200);
        } else {
            //Token is still good, logging in user
            $user = User::where('userID', '=', $token->userID)->first();
            $response['userType'] = $user->userType;
            $response['status'] = 200;
            $response['success'] = true;
            return response()->json($response, 200);
        }
    }
}
