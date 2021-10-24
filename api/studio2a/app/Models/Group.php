<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    // note groups is a keyword in sql so table is called proj_groups
    protected $table = 'proj_groups';
    protected $primaryKey = 'groupID';
    protected $connection = 'studio2a';
    public $timestamps = false;

    protected $filalble = [
        'projectID'
    ];


}
