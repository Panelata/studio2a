<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'userID';
    protected $connection = 'studio2a';
    public $timestamps = false;

    protected $filalble = [
        'firstName', 'lastName', 'username', 'password', 'userType'
    ];

    protected $hidden = [
        'password'
    ];
}
