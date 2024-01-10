<?php

    use Morilog\Jalali\Jalalian;

    if(!function_exists('dateTimPropertyToJalaliDate')){
        function dateTimPropertyToJalaliDate(object $item , string $key):void {
            $date = $item->$key;
            $jalaliDate = Jalalian::forge($date);
            $item->$key = $jalaliDate->toString();
        }
    }

    if(!function_exists('objectsPropertyToJalaliDate')){
        function objectsPropertyToJalaliDate(array $objects , string $key){
            foreach($objects as $object)
                dateTimPropertyToJalaliDate($object,$key);
        }
    }

    if(!function_exists('createdAtPropertyToJalaliDate')){
        function createdAtPropertyToJalaliDate(object $item):void {
            dateTimPropertyToJalaliDate($item,'created_at');
        }
    }

    if(!function_exists('objectsCreatedAtToJalaliDate')){
        function objectsCreatedAtToJalaliDate(array $object):void {
            objectsPropertyToJalaliDate($object,'created_at');
        }
    }
        
?>