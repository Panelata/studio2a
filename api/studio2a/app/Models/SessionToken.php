<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SessionToken extends Model
{
    protected $table = 'session_token';
    protected $primaryKey = 'id';
    protected $connection = 'studio2a';
    public $timestamps = false;

    protected $filalble = [
        'token', 'userID', 'expiryDateTime', 'expired'
    ];

    protected $hidden = [
        
    ];
}
