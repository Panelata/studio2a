<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $table = 'groups';
    protected $primaryKey = 'groupID';
    protected $connection = 'studio2a';
    public $timestamps = false;

    protected $filalble = [
        'projectID'
    ];


}
