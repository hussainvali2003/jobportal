
  package com.jobportal.demo.controller;
  
  import org.springframework.beans.factory.annotation.Autowired; import
  org.springframework.data.domain.Page; import
  org.springframework.data.domain.PageRequest; import
  org.springframework.data.domain.Pageable; import
  org.springframework.http.ResponseEntity; import
  org.springframework.web.bind.annotation.GetMapping; import
  org.springframework.web.bind.annotation.RequestMapping; import
  org.springframework.web.bind.annotation.RequestParam; import
  org.springframework.web.bind.annotation.RestController;
  
  import com.jobportal.demo.entity.Job;
  import com.jobportal.demo.service.JobFilterService;
  
  import java.util.HashMap; import java.util.List; 
  
  import java.util.Map;
  
  @RestController
  
  @RequestMapping("/api/jobs") public class JobsFilterController {
  
  @Autowired private JobFilterService jobFilteringService;
  
  @GetMapping("/filter") public ResponseEntity<Map<String, Object>>
  getFilteredJobs(
  
  @RequestParam(required = false) String searchTerm,
  
  @RequestParam(required = false) String experience,
  
  @RequestParam(required = false) String location,
  
  @RequestParam(required = false) String status,
  
  @RequestParam(required = false) String field,
  
  @RequestParam(required = false) String jobId,
  
  @RequestParam(defaultValue = "0") int page,
  
  @RequestParam(defaultValue = "3") int size) {
  
  Pageable pageable = PageRequest.of(page, size); Page<Job> jobsPage =
  jobFilteringService.filterJobsWithNLP( searchTerm, experience, location,
  status, field, jobId, pageable );
  
  Map<String, Object> response = new HashMap<>(); response.put("jobs",
  jobsPage.getContent()); response.put("currentPage", jobsPage.getNumber());
  response.put("totalItems", jobsPage.getTotalElements());
  response.put("totalPages", jobsPage.getTotalPages()); 
  response.put("hasNext",jobsPage.hasNext()); 
  response.put("hasPrevious", jobsPage.hasPrevious());
  response.put("size", jobsPage.getSize());
  
  return ResponseEntity.ok(response); }
  
  // Keep the old endpoint for backward compatibility (without pagination)
  
  @GetMapping("/filter/all") public ResponseEntity<List<Job>>
  getAllFilteredJobs(
  
  @RequestParam(required = false) String searchTerm,
  
  @RequestParam(required = false) String experience,
  
  @RequestParam(required = false) String location,
  
  @RequestParam(required = false) String status,
  
  @RequestParam(required = false) String field,
  	
  @RequestParam(required = false) String jobId) {
  
  List<Job> jobs = jobFilteringService.filterJobsWithNLP( searchTerm,
  experience, location, status, field, jobId );
  
  return ResponseEntity.ok(jobs); } }