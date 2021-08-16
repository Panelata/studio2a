<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    protected $table = 'test';
    protected $primaryKey = 'id';
    protected $connection = 'studio2a';
    public $timestamps = false;

    protected $filalble = [

    ];

    protected $hidden = [

    ];
}
