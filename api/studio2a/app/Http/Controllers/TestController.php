<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Test;

class TestController extends Controller
{
    public function test(Request $request){
        Log::debug("THIS IS A TEST LOG");

        $dbtest = Test::where('id', '=', 1)->get();
        Log::debug($dbtest);

        $response['message'] = 'Successful Setup';
        $response['status'] = 200;
        $response['success'] = true;
        return response()->json($response, 200);
    }
}
