from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound, HTTPCreated, HTTPNoContent
from ..models import Matakuliah
import json

# GET all
@view_config(route_name='get_all_matakuliah', renderer='json', request_method='GET')
def get_all_matakuliah(request):
    items = request.dbsession.query(Matakuliah).all()
    result = []
    for mk in items:
        result.append({
            "id": mk.id,
            "kode_mk": mk.kode_mk,
            "nama_mk": mk.nama_mk,
            "sks": mk.sks,
            "semester": mk.semester
        })
    return result

# GET by id
@view_config(route_name='get_matakuliah', renderer='json', request_method='GET')
def get_matakuliah(request):
    mk = request.dbsession.query(Matakuliah).get(int(request.matchdict['id']))
    if not mk:
        return HTTPNotFound()
    return vars(mk)

# POST
@view_config(route_name='create_matakuliah', renderer='json', request_method='POST')
def create_matakuliah(request):
    data = request.json_body
    mk = Matakuliah(
        kode_mk=data["kode_mk"],
        nama_mk=data["nama_mk"],
        sks=data["sks"],
        semester=data["semester"],
    )
    # Add the object to the session
    request.dbsession.add(mk)
    # Make sure it's flushed to get an ID
    request.dbsession.flush()
    
    # Don't call transaction.commit() directly when using pyramid_tm
    # The transaction will be committed automatically when the request is completed
    return {"status": "created", "kode_mk": mk.kode_mk}
# PUT
@view_config(route_name='update_matakuliah', renderer='json', request_method='PUT')
def update_matakuliah(request):
    mk = request.dbsession.query(Matakuliah).get(int(request.matchdict['id']))
    if not mk:
        return HTTPNotFound()
    data = request.json_body
    for key, value in data.items():
        setattr(mk, key, value)
    return Response(json_body={"status": "updated"})

# DELETE
@view_config(route_name='delete_matakuliah', renderer='json', request_method='DELETE')
def delete_matakuliah(request):
    mk = request.dbsession.query(Matakuliah).get(int(request.matchdict['id']))
    if not mk:
        return HTTPNotFound()
    request.dbsession.delete(mk)
    return HTTPNoContent()
