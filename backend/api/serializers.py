from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at','author','type']
        extra_kwargs = {'author': {'read_only': True}}
        
    def create(self, validated_data):
        print(validated_data)
        note = Note.objects.create(**validated_data)
        return note
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.type = validated_data.get('type', instance.type)
        instance.save()
        return instance
    
    def delete(self, instance):
        instance.delete()