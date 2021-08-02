<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class Controller extends BaseController
{
    
    public function test(Request $request){
        Log::debug("THIS IS A TEST LOG");
        $response['message'] = 'Successful Setup';
        $response['status'] = 200;
        $response['success'] = true;
        return response()->json($response, 200);
    }
}
