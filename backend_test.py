#!/usr/bin/env python3
import requests
import json
import os
import sys
from datetime import datetime, timedelta

# Get the base URL from environment variables
BASE_URL = os.environ.get('NEXT_PUBLIC_BASE_URL', 'https://345c29b3-96f2-4513-896a-0bf7533edff5.preview.emergentagent.com')
API_BASE_URL = f"{BASE_URL}/api"

# Test results tracking
test_results = {
    "total": 0,
    "passed": 0,
    "failed": 0,
    "failures": []
}

def run_test(test_name, test_func):
    """Run a test and track results"""
    test_results["total"] += 1
    print(f"\n{'='*80}\nRunning test: {test_name}\n{'='*80}")
    
    try:
        result = test_func()
        if result:
            test_results["passed"] += 1
            print(f"✅ PASSED: {test_name}")
            return True
        else:
            test_results["failed"] += 1
            test_results["failures"].append(test_name)
            print(f"❌ FAILED: {test_name}")
            return False
    except Exception as e:
        test_results["failed"] += 1
        test_results["failures"].append(f"{test_name} (Exception: {str(e)})")
        print(f"❌ FAILED: {test_name} - Exception: {str(e)}")
        return False

def test_health_endpoint():
    """Test the health endpoint"""
    url = f"{API_BASE_URL}/health"
    print(f"Making GET request to: {url}")
    
    response = requests.get(url)
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {response.text}")
    
    if response.status_code != 200:
        return False
    
    data = response.json()
    return data.get("status") == "healthy" and "timestamp" in data

def test_get_dossiers():
    """Test getting all dossiers"""
    url = f"{API_BASE_URL}/dossiers"
    print(f"Making GET request to: {url}")
    
    response = requests.get(url)
    print(f"Response status code: {response.status_code}")
    print(f"Response body preview: {response.text[:200]}...")
    
    if response.status_code != 200:
        return False
    
    data = response.json()
    return isinstance(data, list)

def test_create_dossier():
    """Test creating a new dossier"""
    url = f"{API_BASE_URL}/dossiers"
    print(f"Making POST request to: {url}")
    
    payload = {
        "address": "123 Test Street, Test City",
        "type": "residential",
        "priority": "high"
    }
    
    print(f"Request payload: {json.dumps(payload)}")
    response = requests.post(url, json=payload)
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {response.text}")
    
    if response.status_code != 201:
        return False
    
    data = response.json()
    return (
        data.get("address") == payload["address"] and
        data.get("type") == payload["type"] and
        data.get("priority") == payload["priority"] and
        "id" in data
    )

def test_get_messages():
    """Test getting all messages"""
    url = f"{API_BASE_URL}/messages"
    print(f"Making GET request to: {url}")
    
    response = requests.get(url)
    print(f"Response status code: {response.status_code}")
    print(f"Response body preview: {response.text[:200]}...")
    
    if response.status_code != 200:
        return False
    
    data = response.json()
    return isinstance(data, list)

def test_create_message():
    """Test creating a new message"""
    url = f"{API_BASE_URL}/messages"
    print(f"Making POST request to: {url}")
    
    payload = {
        "role": "user",
        "content": "This is a test message",
        "dossierId": "test-dossier-id"
    }
    
    print(f"Request payload: {json.dumps(payload)}")
    response = requests.post(url, json=payload)
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {response.text}")
    
    if response.status_code != 201:
        return False
    
    data = response.json()
    return (
        data.get("role") == payload["role"] and
        data.get("content") == payload["content"] and
        data.get("dossierId") == payload["dossierId"] and
        "id" in data and
        "timestamp" in data
    )

def test_create_relance():
    """Test creating a new follow-up"""
    url = f"{API_BASE_URL}/relances"
    print(f"Making POST request to: {url}")
    
    tomorrow = datetime.now() + timedelta(days=1)
    payload = {
        "contactId": "test-contact-id",
        "type": "email",
        "message": "This is a test follow-up message",
        "scheduledAt": tomorrow.isoformat()
    }
    
    print(f"Request payload: {json.dumps(payload)}")
    response = requests.post(url, json=payload)
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {response.text}")
    
    if response.status_code != 201:
        return False
    
    data = response.json()
    return (
        data.get("contactId") == payload["contactId"] and
        data.get("type") == payload["type"] and
        data.get("message") == payload["message"] and
        "id" in data and
        "status" in data and
        data.get("status") in ["scheduled", "sent"]
    )

def test_get_documents():
    """Test getting all documents"""
    url = f"{API_BASE_URL}/documents"
    print(f"Making GET request to: {url}")
    
    response = requests.get(url)
    print(f"Response status code: {response.status_code}")
    print(f"Response body preview: {response.text[:200]}...")
    
    if response.status_code != 200:
        return False
    
    data = response.json()
    return isinstance(data, list)

def test_get_documents_with_filter():
    """Test getting documents with dossierId filter"""
    dossierId = "test-dossier-id"
    url = f"{API_BASE_URL}/documents?dossierId={dossierId}"
    print(f"Making GET request to: {url}")
    
    response = requests.get(url)
    print(f"Response status code: {response.status_code}")
    print(f"Response body preview: {response.text[:200]}...")
    
    if response.status_code != 200:
        return False
    
    data = response.json()
    return isinstance(data, list)

def test_create_document():
    """Test creating a new document"""
    url = f"{API_BASE_URL}/documents"
    print(f"Making POST request to: {url}")
    
    payload = {
        "dossierId": "test-dossier-id",
        "name": "Test Document",
        "type": "contract",
        "status": "received",
        "required": True
    }
    
    print(f"Request payload: {json.dumps(payload)}")
    response = requests.post(url, json=payload)
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {response.text}")
    
    if response.status_code != 201:
        return False
    
    data = response.json()
    return (
        data.get("dossierId") == payload["dossierId"] and
        data.get("name") == payload["name"] and
        data.get("type") == payload["type"] and
        data.get("status") == payload["status"] and
        data.get("required") == payload["required"] and
        "id" in data
    )

def test_get_calendar():
    """Test getting all calendar events"""
    url = f"{API_BASE_URL}/calendar"
    print(f"Making GET request to: {url}")
    
    response = requests.get(url)
    print(f"Response status code: {response.status_code}")
    print(f"Response body preview: {response.text[:200]}...")
    
    if response.status_code != 200:
        return False
    
    data = response.json()
    return isinstance(data, list)

def test_create_calendar_event():
    """Test creating a new calendar event"""
    url = f"{API_BASE_URL}/calendar"
    print(f"Making POST request to: {url}")
    
    tomorrow = datetime.now() + timedelta(days=1)
    end_time = tomorrow + timedelta(hours=1)
    
    payload = {
        "title": "Test Event",
        "start": tomorrow.isoformat(),
        "end": end_time.isoformat(),
        "type": "meeting",
        "client": "Test Client",
        "dossierId": "test-dossier-id"
    }
    
    print(f"Request payload: {json.dumps(payload)}")
    response = requests.post(url, json=payload)
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {response.text}")
    
    if response.status_code != 201:
        return False
    
    data = response.json()
    return (
        data.get("title") == payload["title"] and
        data.get("type") == payload["type"] and
        data.get("client") == payload["client"] and
        data.get("dossierId") == payload["dossierId"] and
        "id" in data and
        "start" in data and
        "end" in data
    )

def test_create_estimation():
    """Test creating a property estimation"""
    url = f"{API_BASE_URL}/estimation"
    print(f"Making POST request to: {url}")
    
    payload = {
        "dossierId": "test-dossier-id",
        "address": "123 Test Street, Test City"
    }
    
    print(f"Request payload: {json.dumps(payload)}")
    response = requests.post(url, json=payload)
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {response.text}")
    
    if response.status_code != 201:
        return False
    
    data = response.json()
    return (
        data.get("dossierId") == payload["dossierId"] and
        data.get("address") == payload["address"] and
        "id" in data and
        "estimationLow" in data and
        "estimationHigh" in data and
        "confidence" in data
    )

def test_get_kpis():
    """Test getting KPIs"""
    url = f"{API_BASE_URL}/kpis"
    print(f"Making GET request to: {url}")
    
    response = requests.get(url)
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {response.text}")
    
    if response.status_code != 200:
        return False
    
    data = response.json()
    return (
        "hoursGained" in data and
        "relancesSent" in data and
        "docsCompleted" in data and
        "rdvScheduled" in data and
        "calculatedAt" in data
    )

def run_all_tests():
    """Run all API tests"""
    print(f"\n{'='*80}\nTesting Marwyck Copilot Backend APIs\n{'='*80}")
    print(f"Base API URL: {API_BASE_URL}\n")
    
    # Run all tests
    run_test("Health Endpoint", test_health_endpoint)
    run_test("Get Dossiers", test_get_dossiers)
    run_test("Create Dossier", test_create_dossier)
    run_test("Get Messages", test_get_messages)
    run_test("Create Message", test_create_message)
    run_test("Create Relance", test_create_relance)
    run_test("Get Documents", test_get_documents)
    run_test("Get Documents with Filter", test_get_documents_with_filter)
    run_test("Create Document", test_create_document)
    run_test("Get Calendar", test_get_calendar)
    run_test("Create Calendar Event", test_create_calendar_event)
    run_test("Create Estimation", test_create_estimation)
    run_test("Get KPIs", test_get_kpis)
    
    # Print summary
    print(f"\n{'='*80}\nTest Summary\n{'='*80}")
    print(f"Total tests: {test_results['total']}")
    print(f"Passed: {test_results['passed']}")
    print(f"Failed: {test_results['failed']}")
    
    if test_results["failed"] > 0:
        print("\nFailed tests:")
        for failure in test_results["failures"]:
            print(f"  - {failure}")
    
    return test_results["failed"] == 0

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)