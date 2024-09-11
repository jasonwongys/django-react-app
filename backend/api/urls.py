from django.urls import path
from . import views


urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("notes/edit/<int:pk>/", views.NoteEdit.as_view(), name="edit-note"),
    path("notes/<int:pk>/", views.NoteDetail.as_view(), name="note-detail"),
    
]

#ID: jasonw`
# pw: 12345`